"use client";

import Image from "next/image";
import styles from "./adviceCard.module.scss";
import dividerDesktop from "@/public/assets/images/pattern-divider-desktop.svg";
import dividerMobile from "@/public/assets/images/pattern-divider-mobile.svg";
import diceBtn from "@/public/assets/icons/icon-dice.svg";
import { useEffect, useState, useRef } from "react";

export default function AdviceCard() {
  const [count, setCount] = useState(1);
  const [advice, setAdvice] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [adviceList, setAdviceList] = useState([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const topRef = useRef<null | HTMLDivElement>(null);
  const url = "https://api.adviceslip.com/advice";

  async function getAdvice() {
    await fetch(url, { cache: "no-store" })
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
    setIsBtnDisabled(true);
    setIsLoaded(false);
    getAdvice();

    setTimeout(() => {
      setIsBtnDisabled(false);
      setIsLoaded(true);
    }, 1000);
  }, []);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [adviceList]);

  const handleClick = () => {
    setAdviceList((prev): any => [...prev, advice]);
    getAdvice();
    setIsLoaded(false);
    setIsBtnDisabled(true);

    setTimeout(() => {
      setIsLoaded(true);
      setCount(count + 1);
      setIsBtnDisabled(false);
    }, 1000);
  };

  return (
    <section id={styles.advice}>
      <div className={styles.card}>
        <div className={styles.main}>
          <div className={styles.counter}>ADVICE #{count}</div>
          <div
            className={isLoaded ? styles.content : styles.loading}
            id="content"
          >
            <div className={styles.loadingText}>Loading...</div>
            <div className={styles.adviceText}>&quot;{advice}&quot;</div>
          </div>
          <div className={styles.divider}>
            <Image
              className={styles.desktop}
              src={dividerDesktop}
              alt="dividerDesktop"
            />
            <Image
              className={styles.mobile}
              src={dividerMobile}
              alt="dividerMobile"
            />
          </div>
          <button
            className={isBtnDisabled ? styles.buttonDisabled : styles.button}
            type="button"
            onClick={() => {
              handleClick();
            }}
            disabled={isBtnDisabled}
          >
            <Image className={styles.dice} src={diceBtn} alt="diceBtn" />
          </button>
        </div>
      </div>
      <div className={styles.listCard}>
        <div className={styles.main}>
          {adviceList.map((prevAdvice: any, index: any) => (
            <div className={styles.listItem} key={index}>
              <div className={styles.listItemDivider} />
              <div className={styles.listItemContent}>
                <p className={styles.number}>{index + 1}.</p>
                <p className={styles.text}>&quot;{prevAdvice}&quot;</p>
              </div>
            </div>
          ))}
          <div ref={topRef} />
        </div>
      </div>
    </section>
  );
}
