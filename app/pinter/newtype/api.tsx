import { InsertQuery } from "@/app/lib/queryUtils";

export const createStyle = async (formData: FormData) => {
  const rawFormData = {
    image: formData.get("image"),
    name: formData.get("name"),
    style: formData.get("style"),
    brew_days: formData.get("brew_days"),
    condition_days: formData.get("condition_days"),
    rec_brew_days: formData.get("rec_brew_days"),
    rec_condition_days: formData.get("rec_condition_days"),
    abv: formData.get("abv"),
  };

  console.log(rawFormData);
  // mutate data
  // revalidate the cache

  /*const [result] = await InsertQuery(
    "INSERT INTO brew_styles (" +
      "drink_name," +
      "drink_style," +
      "brewing_days," +
      "conditioning_days," +
      "recommended_brewing_days," +
      "recommended_conditioning_days," +
      "abv)" +
      "VALUES (" +
      rawFormData.name +
      ", " +
      rawFormData.style +
      ", " +
      rawFormData.brew_days +
      ", " +
      rawFormData.condition_days +
      ", " +
      rawFormData.rec_brew_days +
      ", " +
      rawFormData.rec_condition_days +
      ", " +
      rawFormData.abv +
      ")"
  );
  return result[0];*/
  const [result] = await InsertQuery(
    "INSERT INTO Temperatures (" +
      "Temperature," +
      "Date_Time)" +
      "VALUES (12, '2025-08-15 07:39:04.000')"
  );
  return result[0];
};
