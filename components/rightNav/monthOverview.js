import { useState, useEffect } from "react";
import {
  getTxtMonth,
  getMonthLength,
  getAcademicYear,
} from "../../helpers/time";
import styles from "../../styles/rooster.module.css";
import MonthGridItem from "./rooster/monthGridItem";

export default function MonthOverview() {
  const [splitMonth, setSplitMonth] = useState("");
  const [calenderItems, setCalenderItems] = useState("");
  const [staticTxtMonth, setStaticTxtMonth] = useState("");
  const [staticYear, setStaticYear] = useState("");
  const [tinyCal, setTinyCal] = useState("");
  const [spacerWidth, setSpacerWidth] = useState("");
  const [weekAmount, setWeekAmount] = useState("");

  let date = new Date();

  function checkOngoing(arg) {
    if (arg + 1 == date.getDate()) {
      return styles.tinyCal__active;
    } else {
      return "";
    }
  }

  function generateMonthItems() {
    let monthNo = getMonthLength(date.getMonth());
    setCalenderItems();
    let preMap = [];
    for (let i = 1; i < monthNo; i++) {
      preMap.push(i);
    }
    console.log(preMap);
    setCalenderItems(
      preMap.map((day, i) => {
        return <MonthGridItem day={i + 1} spacer={spacerWidth} />;
      })
    );
    setTinyCal(
      preMap.map((day, i) => {
        return (
          <div className={styles.tinyCal__item + " " + checkOngoing(i)}>
            <div></div>
          </div>
        );
      })
    );
    //premap mappen en dan calenderitems zetten
  }

  function calcSpacer() {
    let year = date.getFullYear();
    let month = date.getMonth();
    let firstDay = new Date(year, month, 1);
    if (firstDay > 0) {
      setSpacerWidth(firstDay.getDay() - 1);
    } else {
      setSpacerWidth(6);
    }
  }

  useEffect(() => {
    setStaticTxtMonth(getTxtMonth(date.getMonth()));
    setStaticYear(date.getFullYear());
    calcSpacer();
    generateMonthItems();
    setWeekAmount(Math.ceil(getMonthLength(date.getMonth()) / 7));
  }, []);

  return (
    <div className={styles.monthView__container}>
      <div className={styles.sider}>
        <div className={styles.acYear}>
          <p className={styles.acYear__date}>{getAcademicYear(date)}</p>
        </div>
        <div className={styles.sider__month}>
          <div className={styles.sider__monthText}>{staticTxtMonth}</div>
        </div>
        <div className={styles.tinyCal}>
          <div
            className={styles.month__spacer}
            style={{ gridArea: "1 /1 /span 1 / span " + spacerWidth }}
          ></div>
          {tinyCal}
        </div>
      </div>
      <div className={styles.month__grid}>
        <div
          className={styles.month__spacer}
          style={{ gridArea: "1 /1 /span 1 / span " + spacerWidth }}
        ></div>
        <div
          className={styles.month__dayCol}
          style={{ gridArea: "1 / 1 / span " + weekAmount + " / span 1" }}
        >
          ma
        </div>
        <div
          className={styles.month__dayCol}
          style={{ gridArea: "1 / 2 / span " + weekAmount + " / span 1" }}
        >
          di
        </div>
        <div
          className={styles.month__dayCol}
          style={{ gridArea: "1 / 3 / span " + weekAmount + " / span 1" }}
        >
          wo
        </div>
        <div
          className={styles.month__dayCol}
          style={{ gridArea: "1 / 4 / span " + weekAmount + " / span 1" }}
        >
          do
        </div>
        <div
          className={styles.month__dayCol}
          style={{ gridArea: "1 / 5 / span " + weekAmount + " / span 1" }}
        >
          vr
        </div>
        <div
          className={styles.month__dayCol}
          style={{ gridArea: "1 / 6 / span " + weekAmount + " / span 1" }}
        >
          za
        </div>
        <div
          className={styles.month__dayCol}
          style={{ gridArea: "1 / 7 / span " + weekAmount + " / span 1" }}
        >
          zo
        </div>
        <div
          className={styles.month__spacer}
          style={{ gridArea: "1 /1 /span 1 / span " + spacerWidth }}
        ></div>
        {calenderItems}
      </div>
    </div>
  );
}
