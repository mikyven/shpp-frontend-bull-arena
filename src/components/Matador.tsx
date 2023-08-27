import React, { useEffect, useState } from "react";
import MatadorImg from "./Matador/matador.png";

interface MatadorInterface {
  applause?: number;
  matadorPosition?: number;
  setMatarodPosition?: Function;
}

export const Matador = React.memo(
  function Мatador({
    applause,
    matadorPosition,
    setMatarodPosition,
  }: MatadorInterface) {
    useEffect(() => {
      function listenerFunc(e: Event) {
        const ev = e as CustomEvent<{ position: number }>;
        if (ev.detail.position === matadorPosition) {
          let randomNum: number;
          do {
            randomNum = Math.floor(Math.random() * 9);
          } while (randomNum === matadorPosition);
          console.log(applause);
          console.log(
            `Matador is moving from ${matadorPosition} to ${randomNum}`
          );
          setMatarodPosition?.(randomNum);
        }
      }
      document.addEventListener("bullRun", listenerFunc);
      if (applause === 2) {
        let a = new Audio("../../public/applause.wav");
        a.volume = 0.3;
        a.play();
      }

      return () => document.removeEventListener("bullRun", listenerFunc);
    }, [matadorPosition, applause]);

    return (
      <div>
        <img src={MatadorImg} height="210px"></img>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return nextProps.applause !== 2 && prevProps.applause === 2;
  }
);
