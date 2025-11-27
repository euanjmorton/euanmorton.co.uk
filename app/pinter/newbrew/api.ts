"use server";
import { UpdatePinterStatus } from "@/app/lib/queryUtils";
import { PinterStatus } from "@/app/lib/types/enums";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { PrismaClient } from "@/generated/prisma/client/client";

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

    const prisma = new PrismaClient();
    let success = false;

  try{
    await prisma.brews.create({
      data: {
        pinter: parseInt(data.pinter),
        brew_type: parseInt(data.brew_type),
        brew_startdate: data.start_date,
        brewing_days: data.brew_days,
        cold_crash_days: data.cold_crash_days,
        conditioning_days: data.condition_days,
        ispindle_id: data.ispindle_id,
        active: true
      }
    });
    success = true;
  }
  catch(e){
    console.log("Error writing to db.", e);
  }
  

  if(success){
    await UpdatePinterStatus(data.pinter, PinterStatus.Brewing);

    revalidatePath("/pinter");
    redirect("/pinter");
  }
};
