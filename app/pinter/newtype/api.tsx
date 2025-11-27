"use server";
import { PrismaClient } from "@/generated/prisma/client/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const fileSchema = z.file();

fileSchema.max(2_000_000);
fileSchema.mime(["image/png", "image/jpg"]); // MIME type

const FormSchema = z.object({
  image: fileSchema,
  name: z.string(),
  style: z.string(),
  brew_days: z.coerce.number(),
  condition_days: z.coerce.number(),
  recommended_brew_days: z.coerce.number(),
  recommended_condition_days: z.coerce.number(),
  abv: z.coerce.number(),
});

export const createStyle = async (formData: FormData) => {
  const rawFormData = {
    image: formData.get("image"),
    name: formData.get("name"),
    style: formData.get("style"),
    brew_days: formData.get("brew_days"),
    condition_days: formData.get("condition_days"),
    recommended_brew_days: formData.get("recommended_brew_days"),
    recommended_condition_days: formData.get("recommended_condition_days"),
    abv: formData.get("abv"),
  };

  const data = FormSchema.parse(rawFormData);

  const prisma = new PrismaClient();
  let success = false;

  try {
    await prisma.brew_styles.create({
      data: {
        brew_name: data.name,
        style: data.style,
        brew_days: data.brew_days,
        condition_days: data.condition_days,
        recommended_brew_days: data.recommended_brew_days,
        recommended_condition_days: data.recommended_condition_days,
        abv: data.abv.toString(),
      },
    });

    success = true;
  } catch (e) {
    console.log("Error writing brew style to db.", e);
  }

  if (success) {
    revalidatePath("/pinter");
    redirect("/pinter");
  }
};
