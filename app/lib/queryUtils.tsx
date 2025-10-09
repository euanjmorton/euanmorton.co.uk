import pool from "@/app/lib/db";
import { RowDataPacket } from "mysql2/promise";
import { PinterStatus } from "./types/enums";

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
