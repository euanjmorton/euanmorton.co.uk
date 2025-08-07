"use client";
import React, { useState, useEffect } from "react";
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

  var sideBar = clsx({
    [style.sideBarOpen]: sideBarVisibility === true,
    [style.sideBarClosed]: sideBarVisibility === false,
  });

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
      </div>
    </>
  );
};

export default SideBar;
