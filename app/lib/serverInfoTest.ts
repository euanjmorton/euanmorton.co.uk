"use server"
import { auth } from "@/auth";


export async function getUser() {
  const session = await auth();
  if (session?.user?.name) {
    return session?.user?.name;
  }

  return "";
}