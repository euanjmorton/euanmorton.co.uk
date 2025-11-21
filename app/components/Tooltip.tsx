import React, { useState } from "react";

interface Props {
  tooltipVisible: boolean;
  tooltipText: string;
  tooltipPos: number[];
}

const Tooltip = (props: Props) => {
  let showTooltip = false;
  if (props.tooltipVisible) {
    showTooltip = true;
  } else {
    showTooltip = false;
  }

  return (
    <>
      <div
        className={`transition-opacity duration-200 ${
          showTooltip ? "opacity-100" : "opacity-0"
        }
        h-40 w-100 relative bg-gray-600 rounded-md text-center     
        after:content-[""]
        after:absolute
        after:bottom-full
        after:left-1/2
        after:-ml-[5px]
        after:border-[5px]
        after:border-solid
        after:border-l-transparent after:border-t-transparent after:border-r-transparent after:border-b-[#555]`}
        style={{
          top: props.tooltipPos[1] + "px",
          left: props.tooltipPos[0] + "px",
        }}
      >
        <span className="text-xl">{props.tooltipText}</span>
      </div>
    </>
  );
};

export default Tooltip;
