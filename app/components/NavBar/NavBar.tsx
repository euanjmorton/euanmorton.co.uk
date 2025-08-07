import clsx from "clsx";
import React from "react";
import style from "./style.module.css";

const NavBar = () => {
  return (
    <div className={clsx(style.navBar)}>
      <div></div>
      <div className="">
        <button className="btn btn-neutral">Login</button>
      </div>
    </div>
  );
};

export default NavBar;
