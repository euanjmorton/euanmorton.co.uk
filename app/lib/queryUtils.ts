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

//let qS = "SELECT * FROM temperatures WHERE Date_Time >= '" + startDate + "' " + "AND Date_Time <= '" + endDate + "';"

export async function SelectTemps(startDate: string, endDate: string) {
  const temps = await prisma.temperatures.findMany({
    where: {
      Date_Time: {
        gte: startDate, // >=
        lte: endDate, // <=
      },
    },
  });
  console.log(temps);
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

  const user2 = {
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    password: user.password,
  };
  console.log(user);
  return user2;
}

export async function SelectQuery(queryString: string, params?: []) {
  try {
    return [];
    //const results = await pool.execute(queryString, params);
    //return results as QueryResult[];
  } catch (e) {
    console.log("Cant connect", e);
    return [];
  }
}
export async function SelectQuery2<T extends RowDataPacket>(
  queryString: string,
  params?: []
) {
  try {
    return [];
    //const results = await pool.execute(queryString, params);
    //return results as RowDataPacket[];
  } catch (e) {
    console.log("Cant connect", e);
    return [];
  }
}

export async function InsertQuery(queryString: string, params?: []) {
  try {
    return []; //const results = await pool.execute(queryString, params);
    //return results as RowDataPacket[];
  } catch (e) {
    console.log("Cant connect", e);
    return [];
  }
}
export async function UpdatePinterStatus(status: PinterStatus, pinter: string) {
  /*try {
    const results = await pool.execute(
      "UPDATE pinters SET pinter_status = ? WHERE pinter_id = ?",
      [status, pinter]
    );
    return results as RowDataPacket[];
  } catch (e) {
    console.log("Cant connect", e);
    return [];
  }*/
}
