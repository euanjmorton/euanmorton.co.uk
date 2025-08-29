"use client";

import React, { Suspense, useEffect, useState } from "react";
import { startBrew } from "@/app/pinter/newbrew/api";
import style from "../style.module.css";
import clsx from "clsx";
import { getPinters, getBrewTypes, getSpindles } from "@/app/lib/pinterInfo";
import { Pinter, BrewType, Spindle } from "@/app/lib/types/definitions";

const CreateNewBrewPage = () => {
  const [pinters, setPinters] = useState<Pinter[]>([]);
  const [brewTypes, setBrewTypes] = useState<BrewType[]>([]);
  const [iSpindles, setiSpindles] = useState<Spindle[]>([]);

  const [selectedBrew, setSelectedBrewData] = useState<BrewType>();

  useEffect(() => {
    getPinters().then((res) => {
      setPinters(res as Pinter[]);
    });
  }, []);

  useEffect(() => {
    getPinters().then((res) => {
      setPinters(res as Pinter[]);
    });

    getBrewTypes().then((res) => {
      setBrewTypes(res as BrewType[]);
    });

    getSpindles().then((res) => {
      setiSpindles(res as Spindle[]);
    });
  }, []);

  const setBrewData = (brewTypeId: number) => {
    for (let i = 0; i < brewTypes.length; i++) {
      const brewType = brewTypes[i];
      if (brewType.brew_type_id == brewTypeId) {
        const newBrew: BrewType = {
          brew_type_id: brewType.brew_type_id,
          brew_name: brewType.brew_name,
          style: brewType.style,
          brew_days: brewType.brew_days,
          condition_days: brewType.condition_days,
          recommended_brew_days: brewType.recommended_brew_days,
          recommended_condition_days: brewType.recommended_condition_days,
          abv: brewType.abv,
        };

        setSelectedBrewData(newBrew);
      }
    }
  };

  return (
    <>
      <form
        className={clsx(style.form, "flex flex-col w-350")}
        action={startBrew}
      >
        <p>Pinter</p>

        <select name="pinter" id="pinter" required>
          <option value="">-- Select --</option>
          <Suspense fallback={<>Loading...</>}>
            {pinters.map((pinter: Pinter) => (
              <option
                key={"pinter_id_" + pinter.pinter_id}
                value={pinter.pinter_id}
              >
                {pinter.pinter_name}
              </option>
            ))}
          </Suspense>
        </select>
        <p>Brew Type:</p>

        <Suspense fallback={<>Loading...</>}>
          <select
            name="brew_type"
            id="brew_type"
            onChange={(e) => setBrewData(parseInt(e.target.value))}
            required
          >
            <option value="">-- Select --</option>
            {brewTypes.map((brewTypes: BrewType) => (
              <option
                key={"brew_id_" + brewTypes.brew_type_id}
                value={brewTypes.brew_type_id}
              >
                {brewTypes.brew_name}
              </option>
            ))}
          </select>
        </Suspense>

        <div>
          <p>Brew Info:</p>
          <p>Brewing days: {selectedBrew?.brew_days}</p>
          <p>Conditioning days: {selectedBrew?.condition_days}</p>
          <p>Recommended Brewing days: {selectedBrew?.recommended_brew_days}</p>
          <p>
            Recommended Conditioning days:{" "}
            {selectedBrew?.recommended_condition_days}
          </p>
        </div>

        <p>Number of brewing days:</p>
        <input
          type="number"
          name="brew_days"
          defaultValue={selectedBrew?.recommended_brew_days}
          required
        ></input>
        <p>Number of cold crash days:</p>
        <input
          id="coldCrashDays"
          type="number"
          name="cold_crash_days"
          defaultValue="0"
          required
        ></input>
        <p>Number of conditioning days:</p>
        <input
          type="number"
          name="condition_days"
          defaultValue={selectedBrew?.recommended_condition_days}
          required
        ></input>

        <select name="ispindle" id="ispindle" defaultValue="0">
          <option value="0">-- Select --</option>
          <Suspense fallback={<>Loading...</>}>
            {iSpindles.map((iSpindle: Spindle) => (
              <option
                key={"ispindle_id_" + iSpindle.ispindle_id}
                value={iSpindle.ispindle_id}
              >
                {iSpindle.ispindle_colour}
              </option>
            ))}
          </Suspense>
        </select>

        <p>Start date:</p>
        <input type="date" id="start_date" name="start_date" required></input>

        <button className="btn btn-Primary" type="submit">
          Add Style
        </button>
      </form>
    </>
  );
};

export default CreateNewBrewPage;
