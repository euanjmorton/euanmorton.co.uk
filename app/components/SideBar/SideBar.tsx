"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BurgerButton from "./BurgerButton";
import style from "./style.module.css";
import { clsx } from "clsx";
import { getUser } from "@/app/lib/serverInfoTest";

const SideBar = () => {
  const [sideBarVisibility, setSideBarVisisbility] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    getUser().then((res) => {
      setUser(res);
    });
  }, []);
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

  const navPinter = () => {
    togleSidebar();
    router.push("/pinter");
  };

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
          <div>{user && user}</div>
          <div className="pt-50">
            <button className="btn btn-Primary" onClick={() => navPinter()}>
              Pinter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
