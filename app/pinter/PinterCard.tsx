import React from "react";

interface Props {
  pinterName: string;
  onClick: () => void;
}

const PinterCard = (props: Props) => {
  return <div>PinterCard {props.pinterName}</div>;
};

export default PinterCard;
