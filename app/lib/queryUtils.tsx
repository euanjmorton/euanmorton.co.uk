import pool from "@/app/lib/db";
import { RowDataPacket } from "mysql2/promise";

export async function SelectQuery(queryString: string, params?: []) {
  const results = await pool.execute(queryString, params);
  return results as RowDataPacket[];
}
