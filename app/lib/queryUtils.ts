"use server";
//import pool from "@/app/lib/db";
import { RowDataPacket } from "mysql2/promise";
import { PinterStatus } from "./types/enums";

import { PrismaClient } from "@/generated/prisma/client/client";
//("@/generated/prisma/client");

const prisma = new PrismaClient();

export async function SelectQueryBrews() {
  const allUsers = await prisma.brew_styles.findFirst();
  console.log(allUsers);
  return allUsers;
}

export async function SelectTemps(startDate: string, endDate: string) {
  const temps = await prisma.temperatures.findMany({
    where: {
      Date_Time: {
        gte: startDate, // >=
        lte: endDate, // <=
      },
    },
  });
  
  return temps;
}

export async function GetUser(email: string, pwHash: string) {
  const user = await prisma.users.findFirst({
    where: {
      email: email
    },
  });

  if (!user) return null;
  if (!user.password) return null;

  const dbPw = user.password.split(":");

  if(dbPw[1] == pwHash){
    console.log(user);
    return user;
  }
  
  return null;
}

export async function UpdatePinterStatus( pinter: string, status: PinterStatus,) {
   const user = await prisma.pinters.update({
    where: { pinter_id: parseInt(pinter) },
    data: { pinter_status: status },
  })
}
