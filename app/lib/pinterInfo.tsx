"use server";
import { SelectQuery } from "./queryUtils";

export const getPinters = async () => {
  const [Pinters] = await SelectQuery("SELECT * FROM pinters");

  return Pinters;
};
