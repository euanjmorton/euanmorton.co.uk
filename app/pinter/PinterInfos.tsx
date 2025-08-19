"use client";
import React, { Suspense, useEffect, useState } from "react";
import { getPinters } from "../lib/pinterInfo";
import PinterCard from "./PinterCard";

type Pinter = {
  pinter_id: number;
  pinter_name: string;
};

const PinterInfos = () => {
  //for each pinter
  //show status -temps n colour/image
  //onclik reveals graphs

  const [pinters, setPinters] = useState<Pinter[]>([]);

  useEffect(() => {
    getPinters().then((res) => {
      setPinters(res as Pinter[]);
    });
  }, []);

  function togglePinterView() {
    console.log("hello pinter");
  }

  return (
    <>
      <div>PinterInfos</div>
      <Suspense fallback={<>Loading...</>}>
        {pinters.map((pinter: Pinter) => (
          <PinterCard
            key={pinter.pinter_id}
            pinterName={pinter.pinter_name}
            onClick={() => togglePinterView()}
          ></PinterCard>
        ))}
      </Suspense>
    </>
  );
};

export default PinterInfos;
