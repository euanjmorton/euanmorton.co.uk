import NextAuth from "next-auth"

import { PrismaClient } from "@/generated/prisma/client/client";
//import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"

import Credentials from "next-auth/providers/credentials"

import { GetUserSalt, verifyHashPassword } from "./app/lib/login/loginUtils";
import z, { object, string, ZodError } from "zod"

const prisma = new PrismaClient();
const crypto = require('crypto');


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
                let user = null
                let email = "";
                let password = "";

                if(credentials.email){
                    email = credentials.email.toString();
                }
                if(credentials.password){
                    password = credentials.password.toString();
                }

                const userSalt = await GetUserSalt(email);
                if(!userSalt){
                    throw new Error("Email not recognised");
                }

                const hash = generateHashPassword(password, userSalt);
                const dbuser = await verifyHashPassword(email, hash)

                if (!dbuser) {
                    console.error("Auth error, invalid credentials");
                    throw new Error("Invalid credentials.");
                }

                user = {
                    id: dbuser.id.toString(),
                    name: dbuser.name,
                    email: dbuser.email,
                }

                return user;
            }
        })
    ],
})

function generateHashPassword(password: string, salt: string) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');

  return hash;
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