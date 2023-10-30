"use client";

import Image from "next/image";
import styles from "./adviceCard.module.scss";
import dividerDesktop from "@/public/assets/images/pattern-divider-desktop.svg";
import dividerMobile from "@/public/assets/images/pattern-divider-mobile.svg";
import diceBtn from "@/public/assets/icons/icon-dice.svg";
import { useEffect, useState } from "react";

export default function AdviceCard() {
  const [count, setCount] = useState(1);
  const [advice, setAdvice] = useState([]);
  const url = "https://api.adviceslip.com/advice";

  function getAdvice() {
    fetch(url, { cache: "no-store" })
      .then((response) => response.json())
      .then((adviceData) => {
        const Adviceobj = adviceData.slip.advice;
        setAdvice(Adviceobj);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAdvice();
  }, []);

  const handleClick = () => {
    getAdvice();
    setCount(count + 1);
  };

  return (
    <section id={`${styles.advice}`}>
      <div className={`${styles.card}`}>
        <div className={`${styles.main}`}>
          <div className={`${styles.counter}`}>ADVICE #{count}</div>
          <div className={`${styles.content}`} id="content">
            &quot;{advice}&quot;
          </div>
          <div className={`${styles.divider}`}>
            <Image
              className={`${styles.desktop}`}
              src={dividerDesktop}
              alt="dividerDesktop"
            />
            <Image
              className={`${styles.mobile}`}
              src={dividerMobile}
              alt="dividerMobile"
            />
          </div>
          <button
            className={`${styles.button}`}
            type="button"
            onClick={handleClick}
          >
            <Image className={`${styles.dice}`} src={diceBtn} alt="diceBtn" />
          </button>
        </div>
      </div>
    </section>
  );
}
