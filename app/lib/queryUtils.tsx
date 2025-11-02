"use server";

//import pool from "@/app/lib/db";
import { QueryResult, RowDataPacket } from "mysql2/promise";
import { PinterStatus } from "./types/enums";

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();
export async function SelectQueryBrews(queryString: string, params?: []) {
  const allUsers = await prisma.brew_styles.findMany();
  console.log(allUsers);
  return allUsers;
}

export async function SelectQuery(queryString: string, params?: []) {
  try {
    const results = await pool.execute(queryString, params);
    return results as QueryResult[];
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
    const results = await pool.execute(queryString, params);
    return results as RowDataPacket[];
  } catch (e) {
    console.log("Cant connect", e);
    return [];
  }
}

export async function InsertQuery(queryString: string, params?: []) {
  try {
    const results = await pool.execute(queryString, params);
    return results as RowDataPacket[];
  } catch (e) {
    console.log("Cant connect", e);
    return [];
  }
}
export async function UpdatePinterStatus(status: PinterStatus, pinter: string) {
  try {
    const results = await pool.execute(
      "UPDATE pinters SET pinter_status = ? WHERE pinter_id = ?",
      [status, pinter]
    );
    return results as RowDataPacket[];
  } catch (e) {
    console.log("Cant connect", e);
    return [];
  }
}
