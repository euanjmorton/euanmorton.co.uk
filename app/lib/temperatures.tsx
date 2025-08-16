import { SelectQuery } from "./queryUtils";

export const getTemp = async () => {
  const [Temperatures] = await SelectQuery(
    "SELECT * FROM Temperatures ORDER BY Date_Time desc LIMIT 1"
  );

  return Temperatures[0].Temperature;
};
