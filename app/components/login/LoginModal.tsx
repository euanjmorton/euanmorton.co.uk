"use client";
import { loginAction } from "app/lib/login/actions";

//@/app/lib/login/actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: any;
  pageRedirect: string;
}

const LoginModal = (props: Props) => {
  if (!props.isOpen) return null;

  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const router = useRouter();

  return (
    <>
      <div
        onClick={props.onClose}
        className="flex items-centre justify-center fixed top-0 left-0 h-full w-full bg-black/60"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white h-300 w-340 m-auto p-[2%] boarder-2 boarder-black rounded-[10px]"
          style={{
            boxShadow: "2px solid black",
          }}
        >
          <form
            action={async (formData) => {
              setLoginError("");
              setEmailError("");
              setPasswordError("");

              const r = await loginAction(formData, props.pageRedirect);

              if (r?.zod) {
                if (r.zod.email) {
                  setEmailError(r.zod.email[0]);
                }
                if (r.zod.password) {
                  setPasswordError(r.zod.password[0]);
                }
                return;
              }

              if (r?.error) {
                console.log({ general: [r.error] });
                setLoginError("Invalid credentials");
                return;
              }

              router.push(props.pageRedirect);
            }}
            className="text-black"
          >
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <div>
              <label className="">Email:</label>
              <input
                name="email"
                type="email"
                className="w-full border border-gray-300 rounded-lg p-4"
                placeholder="Enter email"
              ></input>
              <p className="text-red-500">{emailError}</p>
            </div>
            <div className="mt-15">
              <label className="">Password:</label>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-lg p-4"
              ></input>
              <p className="text-red-500">{passwordError}</p>
            </div>

            <div className="flex justify-center mt-20">
              <p className="text-red-500">{loginError}</p>
            </div>

            <button
              className="w-full bg-blue-500 text-white mt-25 p-5 rounded-xl hover:bg-blue-600 transition"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
