"use server";
import { InsertQuery, UpdatePinterStatus } from "@/app/lib/queryUtils";
import { PinterStatus } from "@/app/lib/types/enums";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const fileSchema = z.file();

fileSchema.max(2_000_000);
fileSchema.mime(["image/png", "image/jpg"]); // MIME type

const FormSchema = z.object({
  pinter: z.string(),
  brew_type: z.string(),
  brew_days: z.coerce.number(),
  cold_crash_days: z.coerce.number(),
  condition_days: z.coerce.number(),
  start_date: z.coerce.string(),
  ispindle_id: z.coerce.number(),
});

export const startBrew = async (formData: FormData) => {
  const rawFormData = {
    pinter: formData.get("pinter"),
    brew_type: formData.get("brew_type"),
    brew_days: formData.get("brew_days"),
    cold_crash_days: formData.get("cold_crash_days"),
    condition_days: formData.get("condition_days"),
    start_date: formData.get("start_date"),
    start_time: formData.get("start_time"),
    ispindle_id: formData.get("ispindle"),
  };

  //console.log("rawFormData,", rawFormData);
  rawFormData.start_date = rawFormData.start_date + "T" + rawFormData.start_time;
  const data = FormSchema.parse(rawFormData);
  //console.log(data);

  await InsertQuery(
    "INSERT INTO brews (" +
      "pinter," +
      "brew_type," +
      "brew_startdate," +
      "brewing_days," +
      "cold_crash_days," +
      "conditioning_days," +
      "ispindle_id," +
      "active)" +
      "VALUES (" +
      "'" +
      data.pinter +
      "'" +
      ", " +
      "'" +
      data.brew_type +
      "'" +
      ", " +
      "'" +
      data.start_date +
      "'" +
      ", " +
      data.brew_days +
      ", " +
      data.cold_crash_days +
      ", " +
      data.condition_days +
      ", " +
      data.ispindle_id +
      ", " +
      true +
      ")"
  );

  await UpdatePinterStatus(PinterStatus.Brewing, data.pinter);


  revalidatePath("/pinter");
  redirect("/pinter");

  //return result[0];
};
