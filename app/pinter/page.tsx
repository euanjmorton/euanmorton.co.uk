import React, { Suspense } from "react";
import PinterButtons from "./PinterButtons";
import PinterInfos from "./PinterInfos";
import { auth } from "@/auth";
import { getLatestTemp } from "../lib/pinterInfo";

const PinterPage = async () => {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  const currentTemperature = await getLatestTemp();

  return (
    <>
      <div>
        <h2>Pinter Page</h2>
      </div>
      <div>
        <h3>Current Temperature:</h3>

        <Suspense fallback={<>Loading...</>}>
          <p>Temp: {currentTemperature?.Temperature}</p>
        </Suspense>
      </div>
      <div>
        <PinterButtons></PinterButtons>
      </div>
      <div>
        <PinterInfos></PinterInfos>
      </div>
    </>
  );
};

export default PinterPage;
