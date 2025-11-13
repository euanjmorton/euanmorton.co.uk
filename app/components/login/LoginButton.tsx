"use client";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import LoginModal from "./LoginModal";

const LoginButton = () => {
  const [loginFormShow, setloginFormShow] = useState(false);

  const handleClose = () => {
    setloginFormShow(false);
  };

  const handleOpen = () => {
    setloginFormShow(true);
  };

  return (
    <>
      <button className="btn btn-Primary" onClick={() => handleOpen()}>
        Sign in
      </button>
      <LoginModal isOpen={loginFormShow} onClose={handleClose}></LoginModal>
    </>
  );
};

export default LoginButton;
