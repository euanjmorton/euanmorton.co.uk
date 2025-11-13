"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <>
      <button className="btn btn-Primary" onClick={() => signOut()}>
        Sign out
      </button>
    </>
  );
};

export default LogoutButton;
