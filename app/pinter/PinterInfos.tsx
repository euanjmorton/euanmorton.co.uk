"use client";
import React, { Suspense, useEffect, useState } from "react";
import { getActiveBrews, getPinters } from "../lib/pinterInfo";
import { Brew, Pinter } from "@/app/lib/types/definitions";
import PinterCard from "./PinterCard";
import clsx from "clsx";
import PinterInfo from "./PinterInfo";
import Image from "next/image";

const PinterInfos = () => {
  const [pinters, setPinters] = useState<Pinter[]>([]);
  const [activePinter, setActivePinter] = useState<Pinter>();
  const [activeBrews, setActiveBrews] = useState<Brew[]>([]);
  const [activeBrew, setActiveBrew] = useState<Brew>();
  const [pinterWindow, setPinterWindow] = useState("list");

  useEffect(() => {
    getPinters().then((res) => {
      console.log("hello pinter", res);
      setPinters(res as Pinter[]);
    });
    getActiveBrews().then((res) => {
      console.log("hello BREW", res);
      setActiveBrews(res as Brew[]);
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
          pinter_status: pinters[i].pinter_status,
        });
      }

      for (let i = 0; i < activeBrews.length; i++) {
        if (activeBrews[i].pinter == pinter_id) {
          setActiveBrew({
            pinter: pinter_id,
            brew_days: activeBrews[i].brew_days,
            cold_crash_days: activeBrews[i].cold_crash_days,
            condition_days: activeBrews[i].condition_days,
            brew_type: "",
            ispindle_id: activeBrews[i].ispindle_id,
            start_date: activeBrews[i].start_date,
            start_time: activeBrews[i].start_time,
          });
        }
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
              pinterStatus={pinter.pinter_status}
              onClick={() => togglePinterView(pinter.pinter_id)}
            ></PinterCard>
          ))}
        </Suspense>
      </div>
      <div className={clsx(infoWindow)}>
        <div onClick={() => togglePinterView(0)}>
          <Image
            id="backButton"
            className={"cursor-pointer"}
            src="/icons/arrow-sm-left.svg"
            alt="pinter back button"
            width="20"
            height="20"
          />
        </div>
        <div>
          {activePinter && (
            <PinterInfo
              pinterId={activePinter.pinter_id}
              pinterName={activePinter.pinter_name}
              pinterColour={activePinter.pinter_colour}
              pinterStatus={activePinter.pinter_status}
              brewingDays={activeBrew?.brew_days}
              coldCrashDays={activeBrew?.cold_crash_days}
              conditionDays={activeBrew?.condition_days}
            ></PinterInfo>
          )}
        </div>
      </div>
    </>
  );
};

export default PinterInfos;
