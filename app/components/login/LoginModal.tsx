import { signIn } from "next-auth/react";
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: any;
}

const LoginModal = (props: Props) => {
  if (!props.isOpen) return null;

  const [email, setEmail] = useState("");

  const popLog = () => {};

  return (
    <>
      <div
        onClick={props.onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "white",
            height: 150,
            width: 240,
            margin: "auto",
            padding: "2%",
            border: "2px solid #000",
            borderRadius: "10px",
            boxShadow: "2px solid black",
          }}
        >
          <form
            action={async (formData) => {
              console.log("formData", formData);
              await signIn("credentials", {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                redirect: false,
              });
            }}
          >
            <p className="text-black">Email:</p>
            <input name="email" type="email" value="test@email.com"></input>
            <p className="text-black">Password:</p>
            <input
              name="password"
              type="password"
              value="p4ssword"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button className="btn btn-Primary text-black" type="submit">
              Send Login
            </button>
            <button
              className="btn btn-Primary text-black"
              onClick={() => popLog()}
            >
              po log
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
