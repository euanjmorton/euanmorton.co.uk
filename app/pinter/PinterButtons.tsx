"use client";
import { useRouter } from "next/navigation";
import React from "react";

const createNewBrew = () => {};

const viewBrews = () => {};

const PinterButtons = () => {
  const router = useRouter();
  return (
    <>
      <button className="btn btn-Primary" onClick={() => createNewBrew()}>
        Create new Brew
      </button>
      <button className="btn btn-Primary" onClick={() => viewBrews()}>
        View past brews
      </button>
      <button
        className="btn btn-Primary"
        onClick={() => router.push("/pinter/newtype")}
      >
        Add Brew Type
      </button>
    </>
  );
};

export default PinterButtons;
