"use client";

import Image from "next/image";
import style from "./style.module.css";

interface Props {
  onClick: () => void;
}

const BurgerButton = (props: Props) => {
  return (
    <Image
      id="burgerButton"
      className={style.burgerButton}
      src="/burger_icon.png"
      onClick={props.onClick}
      alt="temp graph test"
      width="20"
      height="20"
    />
  );
};

export default BurgerButton;
