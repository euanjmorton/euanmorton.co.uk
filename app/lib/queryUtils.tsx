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
      "UPDATE pinter SET status = " + status + " WHERE pinter_id = " + pinter
    );
    return results as RowDataPacket[];
  } catch (e) {
    console.log("Cant connect", e);
    return [];
  }
}
