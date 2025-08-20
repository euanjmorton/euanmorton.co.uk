import clsx from "clsx";
import React from "react";

interface Props {
  pinterId: number;
  pinterName: string;
  pinterColour: string;
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

  return (
    <>
      <div
        className={clsx(
          "flex flex-col justify-center items-center rounded-sm h-150 w-250 m-5 cursor-pointer",
          backgroundColour
        )}
      >
        <p>{props.pinterName}</p>
      </div>
    </>
  );
};

export default PinterInfo;
