import clsx from "clsx";
import React from "react";
import style from "./style.module.css";
import LoginButton from "../login/LoginButton";

const NavBar = () => {
  //
  // <button className="btn btn-neutral">Login</button>;
  return (
    <div className={clsx(style.navBar)}>
      <div></div>
      <div className=""></div>
    </div>
  );
};

export default NavBar;
