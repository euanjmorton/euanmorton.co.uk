"use client";
import React, { Suspense, useEffect, useState } from "react";
import { getPinters } from "../lib/pinterInfo";
import PinterCard from "./PinterCard";
import clsx from "clsx";
import PinterInfo from "./PinterInfo";

type Pinter = {
  pinter_id: number;
  pinter_name: string;
  pinter_colour: string;
};

const PinterInfos = () => {
  const [pinters, setPinters] = useState<Pinter[]>([]);
  const [activePinter, setActivePinter] = useState<Pinter>();
  const [pinterWindow, setPinterWindow] = useState("list");

  useEffect(() => {
    getPinters().then((res) => {
      console.log("hello pinter", res);
      setPinters(res as Pinter[]);
    });
  }, []);

  const infoWindow = clsx({
    flex: pinterWindow != "list",
    hidden: pinterWindow === "list",
  });
  const listWindow = clsx({
    flex: pinterWindow === "list",
    hidden: pinterWindow != "list",
  });

  function togglePinterView(pinter_id: number) {
    if (pinter_id == 0) {
      setPinterWindow("list");
    } else {
      setPinterWindow("pinterInfo");
    }

    for (let i = 0; i < pinters.length; i++) {
      if (pinters[i].pinter_id == pinter_id) {
        setActivePinter({
          pinter_id: pinter_id,
          pinter_name: pinters[i].pinter_name,
          pinter_colour: pinters[i].pinter_colour,
        });
      }
    }
  }

  return (
    <>
      <div className={clsx(listWindow, "flex-row")}>
        <Suspense fallback={<>Loading...</>}>
          {pinters.map((pinter: Pinter) => (
            <PinterCard
              key={pinter.pinter_id}
              pinterName={pinter.pinter_name}
              pinterColour={pinter.pinter_colour}
              onClick={() => togglePinterView(pinter.pinter_id)}
            ></PinterCard>
          ))}
        </Suspense>
      </div>
      <div className={clsx(infoWindow)}>
        <div onClick={() => togglePinterView(0)}>
          <p>back</p>
        </div>
        <div>
          {activePinter && (
            <PinterInfo
              pinterId={activePinter.pinter_id}
              pinterName={activePinter.pinter_name}
              pinterColour={activePinter.pinter_colour}
            ></PinterInfo>
          )}
        </div>
      </div>
    </>
  );
};

export default PinterInfos;
