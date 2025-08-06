"use client";
import React, { useState, useEffect } from "react";
import BurgerButton from "./BurgerButton";
import style from "../components/style.module.css";

const SideBar = () => {
  const [sideBarVisibility, setSideBarVisisbility] = useState(true);

  function togleSidebar() {
    console.log("uihdfhiufd");
    if (sideBarVisibility) {
      setSideBarVisisbility(false);
      //element.classList.add(`${styles.sideBarClosed}`);
    } else {
      setSideBarVisisbility(true);
    }
  }

  var thing = "<p>hello</p>";

  return (
    <>
      <BurgerButton
        sideBarView={sideBarVisibility}
        onClick={() => togleSidebar()}
      ></BurgerButton>

      {sideBarVisibility && <div className={style.sideBarShown}>{thing}</div>}
      {!sideBarVisibility && <div className={style.sideBar}>thing</div>}
    </>
  );
};

export default SideBar;
