import NextAuth from "next-auth"

import authConfig from "./auth.config"

import { PrismaClient } from "@/generated/prisma/client/client";
//import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"

import Credentials from "next-auth/providers/credentials"

//import { saltAndHashPassword } from "@/utils/password"
//import { getUserFromDb } from "@/utils/db"
import { GetUser, SelectQuery } from "./app/lib/queryUtils"
import { object, string } from "zod"

interface UserFromDB {
  id: string;
  name: string;
  email: string;
  password: string;
}
console.log("🧩 NEXTAUTH RUNTIME:", process.env.NEXT_RUNTIME);

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            credentials: {
                email: {  },
                password: {},
            },
            authorize: async (credentials) => {
                try{
                    let user = null

                    const {email, password} = await signInSchema.parseAsync(credentials);

                    //TODO encrypt/hash pw
                    const pwHash = password;
                    //const email = credentials.email;

                    const dbuser = await getUserFromDb(email, pwHash)
                    const newuser = (dbuser as UserFromDB);


                    if (!dbuser) {
                        throw new Error("Invalid credentials.")
                    }

                    user = {
                        id: newuser.id,
                        name: newuser.name,
                        email: newuser.email,
                    }
    
                    return user;
                }
                catch(e){
                    return null;
                }
            }
        })
    ],
})

async function getUserFromDb(email: string, pwHash: string){
    let user = GetUser(email, pwHash);

    return user;
}




export const signInSchema = object({
  email: string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})