import { useState, useEffect } from "react";
import styles from "../../../styles/rooster.module.css";
import { addDays, getAbrWeekday } from "../../../helpers/time";

export default function WeekGridItem(props) {
  let date = new Date();

  function checkWeekDay() {
    if (props.day == date.getDay()) {
      return styles.weekday__active;
    } else {
    }
  }

  function getNumDate() {
    let dayDiff = props.day - date.getDay();
    let calcDay = addDays(date, dayDiff);
    return (
      <>
        <h3>{calcDay.getDate() + "." + calcDay.getMonth()}</h3>
        <p>{getAbrWeekday(calcDay.getDay())}</p>
      </>
    );
  }

  return (
    <div className={checkWeekDay() + " " + styles.weekday__container}>
      <div className={styles.weekday__numDate}>{getNumDate()}</div>
      <div>{/* hier dagcontent in zetten */}</div>
    </div>
  );
}
