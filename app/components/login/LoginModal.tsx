"use client";
import { loginAction } from "app/lib/login/actions";

//@/app/lib/login/actions";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: any;
  pageRedirect: string;
}

const LoginModal = (props: Props) => {
  if (!props.isOpen) return null;

  const [email, setEmail] = useState("");
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
            /*action={async (formData) => {
              console.log("formData", formData);
              const result = await signIn("credentials", {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                redirect: false,
              });

              console.log("Invalid wqqwd: ", result);

              if (result?.error) {
                console.log("Invalid credentials: ", result);
              } else {
                window.location.href = "/pinter";
              }
            }}*/
            action={async (formData) => {
              const r = await loginAction(formData);
              console.log("result: ", r);
              setEmailError("");
              setPasswordError("");

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
                return;
              }

              router.push(r?.url);
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
                //onChange={(e) => setEmail(e.target.value)}
              ></input>
              <p className="text-red-500">{passwordError}</p>
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
