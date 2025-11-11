import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
export const { auth: middleware } = NextAuth(authConfig)
//Edge changes explanation: https://authjs.dev/guides/edge-compatibility#middleware 