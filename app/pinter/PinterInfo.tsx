import clsx from "clsx";
import React from "react";
import { PinterStatus } from "@/app/lib/types/enums";
import * as pinterInfo from "@/app/lib/pinterInfo";

interface Props {
  pinterId: number;
  pinterName: string;
  pinterColour: string;
  pinterStatus: PinterStatus;
  brewingDays?: number;
  coldCrashDays?: number;
  conditionDays?: number;
}

const PinterInfo = (props: Props) => {
  let backgroundColour = "";
  if (props.pinterColour.toLowerCase() == "blue") {
    backgroundColour = "bg-blue-500";
  } else if (props.pinterColour.toLowerCase() == "black") {
    backgroundColour = "bg-gray-700";
  } else if (props.pinterColour.toLowerCase() == "red") {
    backgroundColour = "bg-red-500";
  }

  console.log(pinterInfo);

  let pinterStatus = "";
  let nextStage = "";

  if (props.pinterStatus == PinterStatus.Ready) {
    pinterStatus = "Ready";
  } else if (props.pinterStatus == PinterStatus.Brewing) {
    pinterStatus = "Brewing";
    if (props.coldCrashDays != 0) {
      nextStage = "Cold Crashing";
    } else {
      nextStage = "Conditioning";
    }
  } else if (props.pinterStatus == PinterStatus.ColdCrashing) {
    pinterStatus = "Cold Crashing";
    nextStage = "Conditioning";
  } else if (props.pinterStatus == PinterStatus.Conditioning) {
    pinterStatus = "Conditioning";
    nextStage = "Tapping";
  } else if (props.pinterStatus == PinterStatus.Tapping) {
    pinterStatus = "Tapping";
    nextStage = "Cleaning";
  }

  return (
    <>
      <div
        className={clsx(
          "flex flex-col justify-center items-center rounded-sm h-75 w-150 m-5 cursor-pointer",
          backgroundColour
        )}
      >
        <h2>{props.pinterName}</h2>
      </div>
      <div>
        <p>graph view</p>
        <p>Current Status: {pinterStatus}</p>
        <p>Current Temperature:</p>
        <p>Current ABV:</p>

        <p>Next Stage:</p>
        <p>{nextStage}</p>
        <p> in [x] days</p>
      </div>
    </>
  );
};

export default PinterInfo;
