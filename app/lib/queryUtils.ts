"use server";

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


export async function UpdatePinterStatus( pinter: string, status: PinterStatus,) {
   const user = await prisma.pinters.update({
    where: { pinter_id: parseInt(pinter) },
    data: { pinter_status: status },
  })
}
