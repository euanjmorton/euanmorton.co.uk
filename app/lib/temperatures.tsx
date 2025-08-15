import { SelectQuery } from "./queryUtils";

export const getTemp = async () => {
  const [Temperatures] = await SelectQuery(
    "SELECT * FROM Temperatures ORDER BY DateTime desc LIMIT 1"
  );

  return Temperatures[0].Temperature;
};
