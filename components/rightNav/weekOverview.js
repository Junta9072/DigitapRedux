import { useState, useEffect, useDebugValue } from "react";
import styles from "../../styles/rooster.module.css";
import { getTxtMonth, txtMonth } from "../../helpers/time";
import WeekGrid from "./rooster/weekGrid";

export default function WeekOverView() {
  let date = new Date();
  const [staticTxtMonth, setStaticTxtMonth] = useState("");
  const [staticYear, setStaticYear] = useState("");
  const [weekGrid, setWeekGrid] = useState("");

  useEffect(() => {
    setStaticTxtMonth(getTxtMonth(date.getMonth()));
    setStaticYear(date.getFullYear());
  }, []);

  return (
    <div>
      <header className={styles.rooster__header}>
        <p className={styles.header__year}>{staticYear}</p>
        <h2 className={styles.header__title}>{staticTxtMonth}</h2>
      </header>
      <main className={styles.rooster__main}>
        <div className={styles.rooster__weekgrid}>
          <WeekGrid />
        </div>
      </main>
    </div>
  );
}
