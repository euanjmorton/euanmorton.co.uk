
import { PrismaClient } from "@/generated/prisma/client/client";
//("@/generated/prisma/client");

const prisma = new PrismaClient();
const crypto = require('crypto');

export async function verifyHashPassword(email: string, pwHash: string) {
  const user = await prisma.users.findFirst({
    where: {
      email: email
    },
  });

  if (!user || !user.password) return null;

  if(user.password == pwHash){
    return user;
  }
  
  return null;
}

export async function GetUserSalt(email: string) {
  const user = await prisma.users.findFirst({
    where: {
      email: email
    },
  });

  if (!user) return null;
  
  return user.salt;
}


//TODO create new user functionality 
function createNewUser(useremailname: string, password: string) {

  const salt = crypto.randomBytes(16).toString('hex');
  
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');

  return { salt, hash };
}