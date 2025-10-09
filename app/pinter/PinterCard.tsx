import clsx from "clsx";
import React from "react";
import { PinterStatus } from "../lib/types/enums";

interface Props {
  pinterName: string;
  pinterColour: string;
  pinterStatus: PinterStatus;
  onClick: () => void;
}

const PinterCard = (props: Props) => {
  let backgroundColour = "";
  if (props.pinterColour.toLowerCase() == "blue") {
    backgroundColour = "bg-blue-500";
  } else if (props.pinterColour.toLowerCase() == "black") {
    backgroundColour = "bg-gray-700";
  } else if (props.pinterColour.toLowerCase() == "red") {
    backgroundColour = "bg-red-500";
  }
  return (
    <>
      <div
        onClick={props.onClick}
        className={clsx(
          "flex flex-col justify-center items-center rounded-sm h-150 w-250 m-5 cursor-pointer",
          backgroundColour
        )}
      >
        <p>{props.pinterName}</p>
        <p>{props.pinterStatus}</p>
      </div>
    </>
  );
};

export default PinterCard;
