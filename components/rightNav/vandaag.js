import { useEffect, useState } from "react";
import Rooster_item from "./roosterItem";
import { weekDay, dotW, numDay, txtMonth, hms } from "../../helpers/time";
import styles from "../../styles/Vandaag.module.css";

export default function Vandaag() {
  const [hours, setHours] = useState(hms.hour);
  const [minutes, setMinutes] = useState(hms.minutes);
  const [seconds, setSeconds] = useState(hms.seconds);

  const [lesVandaag, setLesVandaag] = useState(" ");
  const [roosterInhoud, setRoosterInhoud] = useState(" ");

  let date = new Date();

  let dotW_placeholder = 3;
  function dotWfilter(rooster_item) {
    return (
      rooster_item.dotW == dotW_placeholder &&
      new Date(rooster_item.date_start) < date &&
      new Date(rooster_item.date_end) > date
    );
  }

  function readRooster(obj) {
    console.log(obj.roosterInfo.filter(dotWfilter));
    if (obj.roosterInfo.filter(dotWfilter).length != 0) {
      setLesVandaag(styles.rooster__class);
    }

    setRoosterInhoud(
      obj.roosterInfo.filter(dotWfilter).map((rooster_item) => {
        return <Rooster_item data={rooster_item} />;
      })
    );
  }

  const roosterOphalen = async () => {
    const loginData = {
      traject: sessionStorage.getItem("traject"),
    };
    const JSONLoginData = JSON.stringify(loginData);

    const endpoint = "api/getRooster";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "applications/json",
      },
      body: JSONLoginData,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    readRooster(result);
  };

  useEffect(() => {
    roosterOphalen();
  }, []);

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

  function sliderOffsetCalc() {
    if (date.getHours() < 6) {
      return "0%";
    } else if (date.getHours() >= 20) {
      return "calc(100% - 2px)";
    } else {
      return (date.getHours() - 6) / 14;
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
          <div className={styles.rooster__ShowCase}>
            <p className={styles.rooster__noClass + " " + lesVandaag}>
              geen geplande lessen vandaag
            </p>
            {roosterInhoud}
          </div>
          <div
            className={styles.rooster__slider}
            style={{ marginLeft: sliderOffsetCalc() }}
          ></div>
        </section>
      </main>
    </div>
  );
}
