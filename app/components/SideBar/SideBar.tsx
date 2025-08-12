"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BurgerButton from "./BurgerButton";
import style from "./style.module.css";
import { clsx } from "clsx";

const SideBar = () => {
  const [sideBarVisibility, setSideBarVisisbility] = useState(true);

  /*useEffect(() => {
    //code to run
    console.log("sidebar thing ", sideBarVisibility);
    //setSideBarVisisbility(!sideBarVisibility);
    //optional return function
    return () => {
      //clean up
    };
  }, [sideBarVisibility]);*/

  function togleSidebar() {
    setSideBarVisisbility(!sideBarVisibility);
  }

  const sideBar = clsx({
    [style.sideBarOpen]: sideBarVisibility === true,
    [style.sideBarClosed]: sideBarVisibility === false,
  });
  const contentContainer = clsx({
    [style.sideBarContentShow]: sideBarVisibility === true,
    [style.sideBarContentHide]: sideBarVisibility === false,
  });

  const router = useRouter();

  return (
    <>
      <div
        id="sideBar"
        className={clsx(
          style.sideBar,
          sideBar,
          "transition-[width] duration-[400ms] ease-in-out",
          "bg-blue-700"
        )}
      >
        <BurgerButton onClick={() => togleSidebar()}></BurgerButton>
        <div
          id="sideBarContent"
          className={clsx(contentContainer, "flex flex-col items-center")}
        >
          <div className="pt-4">
            <p>EuanMorton.co.uk</p>
          </div>
          <div className="pt-50">
            <button
              className="btn btn-Primary"
              onClick={() => router.push("/pinter")}
            >
              Pinter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
