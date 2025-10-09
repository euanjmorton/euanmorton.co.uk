"use server";
import { InsertQuery } from "@/app/lib/queryUtils";
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

  await InsertQuery(
    "INSERT INTO brew_styles (" +
      "drink_name," +
      "drink_style," +
      "brewing_days," +
      "conditioning_days," +
      "recommended_brewing_days," +
      "recommended_conditioning_days," +
      "abv," +
      "active)" +
      "VALUES (" +
      "'" +
      data.name +
      "'" +
      ", " +
      "'" +
      data.style +
      "'" +
      ", " +
      data.brew_days +
      ", " +
      data.condition_days +
      ", " +
      data.recommended_brew_days +
      ", " +
      data.recommended_condition_days +
      ", " +
      data.abv +
      ", " +
      true +
      ")"
  );

  revalidatePath("/pinter");
  redirect("/pinter");

  //return result[0];
};
