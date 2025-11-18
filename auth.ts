import NextAuth from "next-auth"

import { PrismaClient } from "@/generated/prisma/client/client";
//import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"

import Credentials from "next-auth/providers/credentials"

import { GetUser, SelectQuery } from "./app/lib/queryUtils"
import z, { object, string, ZodError } from "zod"

interface UserFromDB {
  id: string;
  name: string;
  email: string;
  password: string;
}

const prisma = new PrismaClient()
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
                //try{
                    let user = null

                    //const {email, password} = await signInSchema.parseAsync(credentials);

                    let email = "";
                    let password = "";

                    if(credentials.email){
                        email = credentials.email.toString();
                    }
                    if(credentials.password){
                        password = credentials.password.toString();
                    }

                    //TODO encrypt/hash pw
                    const { salt, hash } = hashPassword(password);
                    console.log('Salt:', salt);
                    console.log('Hash:', hash);
                    const pwHash = salt + ":" + hash;
                    //const email = credentials.email;

                    const isValid = verifyPassword(password, salt, hash);

                    const dbuser = await getUserFromDb(email, hash)
                    const newuser = (dbuser as UserFromDB);


                    if (!dbuser) {
                        console.error("throw new error");
                        throw new Error("Invalid credentials.")
                    }

                    user = {
                        id: newuser.id,
                        name: newuser.name,
                        email: newuser.email,
                    }
    
                    return user;
                /*}
                catch(error){
                    if (error instanceof Error) {
                        console.error("error message ", error.message);

                        throw new Error(error.message)
                        //return new Error(error.message);
                    }

                    console.log('erorrr:', error);
                    if (error instanceof ZodError) {
                        console.log('erorrr:ZOD');
                        const thing = z.treeifyError(error)
                        const thing2 = JSON.stringify(thing);
                        throw new Error(thing2);
                    }
                    
                    return null;
                }*/
            }
        })
    ],
})

async function getUserFromDb(email: string, pwHash: string){
    let user = GetUser(email, pwHash);

    return user;
}

function hashPassword(password: string) {

  const salt = crypto.randomBytes(16).toString('hex');

  // Use scrypt for password hashing (recommended)
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');

  // Return both salt and hash for storage
  return { salt, hash };
}

// Function to verify a password
function verifyPassword(password: string, salt: string, hash: string) {
  const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');
  return hashedPassword === hash;
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