"use client";

import React, { useState } from "react";
import burgerIcon from "../../public/burger_icon.png";
import Image from "next/image";
import style from "../components/style.module.css";
import SideBar from "./SideBar";

interface Props {
  sideBarView: boolean;
  onClick: () => void;
}

const BurgerButton = (props: Props) => {
  return (
    <Image
      id="burgerButton"
      className={style.burgerButton}
      src={burgerIcon}
      onClick={props.onClick}
      alt="temp graph test"
    />
  );
};

export default BurgerButton;
