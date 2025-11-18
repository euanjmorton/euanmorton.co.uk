import clsx from "clsx";
import React from "react";
import { PinterStatus } from "@/app/lib/types/enums";
import TemperatureGraph from "./TemperatureGraph";

interface Props {
  pinterId: number;
  pinterName: string;
  pinterColour: string;
  pinterStatus: PinterStatus;
  startDate?: string;
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

  let pinterStatus = "";
  let nextStage = "";
  let nextStageCountdown = 0;
  let daysElapsed = 0;

  if (props.startDate) {
    const brewStart = new Date(props.startDate);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - brewStart.getTime();
    daysElapsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }

  if (props.pinterStatus == PinterStatus.Ready) {
    pinterStatus = "Ready";
  } else if (props.pinterStatus == PinterStatus.Brewing) {
    pinterStatus = "Brewing";

    if (props.coldCrashDays != 0) {
      nextStage = "Cold Crashing";
    } else {
      nextStage = "Conditioning";
    }

    if (props.brewingDays) {
      if (props.brewingDays > daysElapsed) {
        nextStageCountdown = props.brewingDays - daysElapsed;
      }
    }
  } else if (props.pinterStatus == PinterStatus.ColdCrashing) {
    pinterStatus = "Cold Crashing";
    nextStage = "Conditioning";

    if (props.coldCrashDays && props.brewingDays) {
      if (props.coldCrashDays + props.brewingDays > daysElapsed) {
        nextStageCountdown =
          props.brewingDays + props.brewingDays - daysElapsed;
      }
    }
  } else if (props.pinterStatus == PinterStatus.Conditioning) {
    pinterStatus = "Conditioning";
    nextStage = "Tapping";

    if (props.coldCrashDays && props.brewingDays && props.conditionDays) {
      if (
        props.coldCrashDays + props.brewingDays + props.conditionDays >
        daysElapsed
      ) {
        nextStageCountdown =
          props.brewingDays +
          props.brewingDays +
          props.conditionDays -
          daysElapsed;
      }
    }
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
        <TemperatureGraph
          startDate={props.startDate}
          brewingDays={props.brewingDays}
        ></TemperatureGraph>
        <p>Current Status: {pinterStatus}</p>
        <p>Current Temperature:</p>
        <p>Current ABV:</p>

        <p>Next Stage:</p>
        <p>{nextStage}</p>
        <p> in {nextStageCountdown} days</p>
      </div>
    </>
  );
};

export default PinterInfo;
