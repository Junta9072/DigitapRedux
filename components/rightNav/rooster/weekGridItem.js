import { useState, useEffect } from "react";
import styles from "../../../styles/rooster.module.css";
import { addDays, getAbrWeekday } from "../../../helpers/time";

export default function WeekGridItem(props) {
  const [dayDeadlines, setDayDeadlines] = useState("");
  const [daylessen, setDayLessen] = useState("");
  let date = new Date();

  function checkWeekDay() {
    if (props.day == date.getDay()) {
      return styles.weekday__active;
    } else {
    }
  }

  let dayDiff = props.day - date.getDay();
  let calcDay = addDays(date, dayDiff);

  function getNumDate() {
    return (
      <>
        <h3>{calcDay.getDate() + "." + calcDay.getMonth() + 1}</h3>
        <p>{getAbrWeekday(calcDay.getDay())}</p>
      </>
    );
  }

  function getKoepelMatch(id) {
    return props.koepel.find((koepel) => koepel.koepel_ID == id).vak_name;
  }

  function renderInfo() {
    setDayDeadlines(
      props.ddl.map((ddl) => {
        let dDate = new Date(ddl.deadline_date);

        if (dDate.getDay() == props.day) {
          return (
            <li className={styles.weekday__ddl}>
              {ddl.deadline_name}
              <p className={styles.weekday__ddlTime}>
                <span>{getKoepelMatch(ddl.koepel_ID)}</span>
                <span>{dDate.getHours() + "h" + dDate.getMinutes()}</span>
              </p>
            </li>
          );
        }
      })
    );

    setDayLessen(
      props.les.map((les) => {
        if (les.dotW == props.day) {
          les.hour_start = les.hour_start.slice(0, 2);
          les.hour_end = les.hour_end.slice(0, 2);
          return (
            <li className={styles.weekday__les}>
              {les.vak_name}
              <p className={styles.weekday__vakTime}>
                <span>{les.hour_start + "h—" + les.hour_end + "h"}</span>
              </p>
            </li>
          );
        }
      })
    );
  }

  useEffect(() => {
    if (props.les && props.ddl) {
      renderInfo();
    }
  }, [props.les, props.ddl]);

  return (
    <div
      className={checkWeekDay() + " " + styles.weekday__container}
      onClick={() => {
        props.modal(calcDay.getDate());
      }}
    >
      <div className={styles.weekday__numDate}>{getNumDate()}</div>
      <ul className={styles.weekday__ddlContainer}>{daylessen}</ul>
      <ul className={styles.weekday__ddlContainer}>{dayDeadlines}</ul>
    </div>
  );
}
