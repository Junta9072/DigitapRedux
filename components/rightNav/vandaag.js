import { useEffect, useState } from "react";
import { weekDay, numDay, txtMonth, hms } from "../../helpers/time";
import styles from "../../styles/Vandaag.module.css";

export default function Vandaag() {
  const [hours, setHours] = useState(hms.hour);
  const [minutes, setMinutes] = useState(hms.minutes);
  const [seconds, setSeconds] = useState(hms.seconds);

  useEffect(() => {
    setInterval(() => {
      if (hms.seconds < 10) {
        setSeconds("0" + hms.seconds);
      } else {
        setSeconds(hms.seconds);
      }

      if (hms.minutes < 10) {
        setMinutes("0" + hms.minutes);
      } else {
        setMinutes(hms.minutes);
      }
    }, 1000);

    if (hms.hour < 10) {
      setHours("0" + hms.hour);
    } else {
      setHours(hms.hour);
    }

    setInterval(() => {
      if (hms.hour < 10) {
        setHours("0" + hms.hour);
      } else {
        setHours(hms.hour);
      }
    }, 60 * 1000);
  }, []);

  function checkDay(arg) {
    if (dotW == arg) {
      return styles.dayActive;
    } else {
      return "";
    }
  }

  return (
    <div>
      <header className={styles.header__container}>
        <div className={styles.header__content}>
          <p className={styles.header__weekday}>{weekDay}</p>
          <h1 className={styles.header__numDay}>{numDay}</h1>
          <h1 className={styles.header__txtMonth}>{txtMonth}</h1>
          <div className={styles.header__hms}>
            <p className={styles.header__hours}>{hours}</p>
            <p className={styles.header__minutes}>{minutes}</p>
            <p className={styles.header__seconds}>{seconds}</p>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.rooster}>
          <div className={styles.rooster__top}>
            <p>6:00</p>
            <p>7:00</p>
            <p>8:00</p>
            <p>9:00</p>
            <p>10:00</p>
            <p>11:00</p>
            <p>12:00</p>
            <p>13:00</p>
            <p>14:00</p>
            <p>15:00</p>
            <p>16:00</p>
            <p>17:00</p>
            <p>18:00</p>
            <p>19:00</p>
            <p>20:00</p>
          </div>
          <div className={styles.rooster__ShowCase}></div>
        </section>
      </main>
    </div>
  );
}
