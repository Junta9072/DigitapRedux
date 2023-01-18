import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";

export default function AniText(props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeIndex2, setActiveIndex2] = useState(-1);
  const [activeIndex3, setActiveIndex3] = useState(-1);
  const spans = props.text.split("");

  useEffect(() => {
    let timeoutId;
    if (activeIndex === -1) {
      timeoutId = setTimeout(() => {
        setActiveIndex(Math.floor(Math.random() * spans.length));
        setActiveIndex2(Math.floor(Math.random() * spans.length));
        setActiveIndex3(Math.floor(Math.random() * spans.length));
      }, 100);
    } else {
      timeoutId = setTimeout(() => {
        setActiveIndex(
          (prevActiveIndex) => (prevActiveIndex + 1) % spans.length
        );
        setActiveIndex2(
          (prevActiveIndex) => (prevActiveIndex + 1) % spans.length
        );
        setActiveIndex3(
          (prevActiveIndex) => (prevActiveIndex + 1) % spans.length
        );
      }, 100);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeIndex, spans.length]);

  return (
    <div className={styles.fancyText__word}>
      {spans.map((span, index) => {
        return (
          <span
            key={index}
            className={
              index === activeIndex ||
              index === activeIndex2 ||
              index === activeIndex3
                ? styles.txt__spanActive + " " + styles.txt__span
                : styles.txt__span
            }
          >
            {span}
          </span>
        );
      })}
    </div>
  );
}
