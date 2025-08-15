import React from "react";
import { getTemp } from "@/app/lib/temperatures";

const PinterPage = async () => {
  var currentTemperature = await getTemp();

  return (
    <>
      <div>
        <h2>Pinter Page</h2>
      </div>
      <div>
        <h3>Current Temperature:</h3>
        <p>{currentTemperature}</p>
      </div>
      <div></div>
    </>
  );
};

export default PinterPage;
