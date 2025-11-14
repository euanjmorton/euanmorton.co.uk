"use client";
import React, { useEffect, useRef, useState } from "react";
import LoginModal from "./login/LoginModal";

const HomePage = () => {
  const [loginFormShow, setloginFormShow] = useState(false);
  const [pageToRedirect, setPageToRedirect] = useState("");

  const closeLoginModal = () => {
    setloginFormShow(false);
  };

  const openLoginModal = () => {
    setloginFormShow(true);
  };

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      iframe.onload = () => {
        const doc = iframe.contentDocument || iframe.contentWindow!.document;

        const checkButton = setInterval(() => {
          const pinterButton = doc.querySelector("#pinterButton");
          if (pinterButton) {
            setPageToRedirect("/pinter");
            clearInterval(checkButton);
            pinterButton.addEventListener("click", () => {
              openLoginModal();
            });
          }
        }, 100);
      };
    }
  }, []);

  return (
    <>
      <iframe
        ref={iframeRef}
        className="absolute top-0 left-0"
        src="/homePage/index.html"
        style={{ width: "100%", height: "100%" }}
      />
      <LoginModal
        isOpen={loginFormShow}
        pageRedirect={pageToRedirect}
        onClose={closeLoginModal}
      ></LoginModal>
    </>
  );
};

export default HomePage;
