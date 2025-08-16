import React, { Suspense } from "react";
import { getTemp } from "@/app/lib/temperatures";

const PinterPage = async () => {
  const currentTemperature = await getTemp();

  return (
    <>
      <div>
        <h2>Pinter Page</h2>
      </div>
      <div>
        <h3>Current Temperature:</h3>

        <Suspense fallback={<>Loading...</>}>
          <p>{currentTemperature}</p>
        </Suspense>
      </div>
      <div></div>
    </>
  );
};

export default PinterPage;
