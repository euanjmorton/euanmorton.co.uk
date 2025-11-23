"use client";
import React, { useEffect, useRef, useState } from "react";
import LoginModal from "./login/LoginModal";
import Tooltip from "./Tooltip";

const HomePage = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPos, setTooltip] = useState([0, 0]);
  const [tooltipText, setTooltipText] = useState("");
  const [loginFormShow, setloginFormShow] = useState(false);
  const [pageToRedirect, setPageToRedirect] = useState("");

  const closeLoginModal = () => {
    setloginFormShow(false);
  };

  const openLoginModal = () => {
    setloginFormShow(true);
  };

  const showTooltip = (x: number, y: number, tooltipType: string) => {
    if (tooltipType) {
      setTooltipVisible(true);
      setTooltip([x, y]);

      if (tooltipType == "pinter") {
        setTooltipText("Pinter");
      }
    } else {
      setTooltipVisible(false);
    }
  };

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const iframeRect = iframe!.getBoundingClientRect();

    if (iframe) {
      iframe.onload = () => {
        const doc = iframe.contentDocument || iframe.contentWindow!.document;

        const checkButton = setInterval(() => {
          const pinterButton = doc.getElementById("pinterButton");

          if (pinterButton) {
            setPageToRedirect("/pinter");
            clearInterval(checkButton);

            pinterButton.addEventListener("click", () => {
              openLoginModal();
            });

            // Tooltip hover:
            pinterButton.addEventListener("mouseenter", () => {
              const pinterButtonRect = pinterButton!.getBoundingClientRect();

              const x = iframeRect.left + pinterButtonRect.left;
              const y = iframeRect.top + pinterButtonRect.top;
              const tooltip_x = x - 60;
              const tooltip_y = y + 65;

              showTooltip(tooltip_x, tooltip_y, "pinter");
            });
            pinterButton.addEventListener("mouseleave", () => {
              console.log("mouseover out");
              showTooltip(0, 0, "");
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
      <Tooltip
        tooltipVisible={tooltipVisible}
        tooltipPos={tooltipPos}
        tooltipText={tooltipText}
      ></Tooltip>
      <LoginModal
        isOpen={loginFormShow}
        pageRedirect={pageToRedirect}
        onClose={closeLoginModal}
      ></LoginModal>
    </>
  );
};

export default HomePage;
