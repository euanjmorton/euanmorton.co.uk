import pool from "@/app/lib/db";
import { RowDataPacket } from "mysql2/promise";

export async function SelectQuery(queryString: string, params?: []) {
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
