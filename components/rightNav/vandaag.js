import { useEffect, useState } from "react";
import Rooster_item from "./roosterItem";
import Klok from "./klok";
import Deadline from "./deadline";
import {
  weekDay,
  dotW,
  numDay,
  txtMonth,
  hms,
  addDays,
  getWeekDay,
  filterDate,
  getDayDiff,
} from "../../helpers/time";
import styles from "../../styles/Vandaag.module.css";

export default function Vandaag() {
  const [hours, setHours] = useState(hms.hour);
  const [minutes, setMinutes] = useState(hms.minutes);
  const [seconds, setSeconds] = useState(hms.seconds);

  const [lesVandaag, setLesVandaag] = useState(" ");
  const [roosterInhoud, setRoosterInhoud] = useState(" ");
  const [deadlineInhoud, setDeadlineInhoud] = useState("");

  //useStates voor klok
  const [preWeekContent, setPreWeekContent] = useState("");
  const [postWeekContent, setpostWeekContent] = useState("");
  const [weekViewGrid, setWeekViewGrid] = useState("");
  const [klokGridArea, setKlokGridArea] = useState("");

  const [staticWeekDay, setStaticWeekDay] = useState("");
  const [staticNumDay, setStaticNumDay] = useState("");
  const [staticTxtMonth, setStaticTxtMonth] = useState("");
  const [staticHours, setStaticHours] = useState("");
  const [staticMinutes, setStaticMinutes] = useState("");
  const [staticSeconds, setStaticSeconds] = useState("");

  useEffect(() => {
    setStaticWeekDay(weekDay);
    setStaticNumDay(numDay);
    setStaticTxtMonth(txtMonth);
    setStaticHours(hms.hour);
    setStaticMinutes(hms.minutes);
    setStaticSeconds(hms.seconds);
  });

  function getPreWeek() {
    let preWeek = dotW;
    let assembly = [];
    let counter = preWeek + 1;
    for (let i = 0; i < preWeek; i++) {
      assembly.push("");
    }
    let preweekReturn = assembly.map((day) => {
      counter = counter - 1;
      return (
        <div className={styles.weekView__weekDay}>
          <p className={styles.weekView__txtDay}>
            {getWeekDay(new Date(addDays(date, -counter)).getDay())}
          </p>
          <p className={styles.weekView__numDate}>
            {new Date(addDays(date, -counter)).getDate()}
          </p>
        </div>
      );
    });
    return preweekReturn;
  }

  function getPostWeek() {
    let postWeek = 6 - dotW;
    let assembly = [];
    let counter = 0;
    for (let i = 0; i < postWeek; i++) {
      assembly.push("");
    }
    let postweekReturn = assembly.map((day) => {
      counter = counter - 1;
      return (
        <div className={styles.weekView__weekDay}>
          <p className={styles.weekView__txtDay}>
            {getWeekDay(new Date(addDays(date, -counter)).getDay())}
          </p>
          <p
            className={
              styles.weekView__numDate + " " + styles.weekView__numDate__post
            }
          >
            {new Date(addDays(date, -counter)).getDate()}
          </p>
        </div>
      );
    });
    return postweekReturn;
  }

  function getColumnStyling(currentDay) {
    console.log(dotW);
    let styles = {};
    let days = [0, 1, 2, 3, 4, 5, 6]; // Sunday is 0, Monday is 1, etc.

    // Create a string of column widths, with the current day's column set to "auto"
    let columns = days.map((day, index) => {
      if (day === currentDay) {
        return "auto";
      } else if (day < currentDay) {
        return "40px";
      } else {
        return "40px";
      }
    });

    // Set the grid-template-columns property to the string of column widths
    styles["grid-template-columns"] = columns.join(" ");
    console.log(styles);
    setWeekViewGrid(styles["grid-template-columns"]);
  }

  function setKlokStyling() {
    setKlokGridArea("1 /" + (dotW + 1) + "/ span 1 / span 1");
  }

  useEffect(() => {
    setPreWeekContent(getPreWeek());
    setpostWeekContent(getPostWeek());
    getColumnStyling(dotW);
    setKlokStyling();
  }, []);

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
    if (obj.roosterInfo.filter(dotWfilter).length != 0) {
      setLesVandaag(styles.rooster__class);
    }

    setRoosterInhoud(
      obj.roosterInfo.filter(dotWfilter).map((rooster_item) => {
        return <Rooster_item data={rooster_item} />;
      })
    );
  }

  function sevenDaysFilter(ddl) {
    return (
      getDayDiff(ddl.deadline_date, date) > 1 &&
      getDayDiff(ddl.deadline_date, date) <= 7
    );
  }

  function thirtyDaysFilter(ddl) {
    return (
      getDayDiff(ddl.deadline_date, date) > 7 &&
      getDayDiff(ddl.deadline_date, date) <= 30
    );
  }

  function laterFilter(ddl) {
    return getDayDiff(ddl.deadline_date, date) > 30;
  }

  function readDeadlines(result) {
    getDayDiff(date, addDays(date, 7));
    let assembly = [
      result.deadlineBasicInfo
        .filter(
          (ddl) =>
            new Date(ddl.deadline_date).toDateString() == date.toDateString()
        )
        .map((ddl) => {
          return (
            <Deadline
              name={ddl.deadline_name}
              date={ddl.deadline_date}
              class={
                result.koepelInfo.find(
                  (koepel) => koepel.koepel_ID == ddl.koepel_ID
                ).vak_name
              }
            />
          );
        }),
      result.deadlineBasicInfo.filter(sevenDaysFilter).map((ddl) => {
        return (
          <Deadline
            name={ddl.deadline_name}
            date={ddl.deadline_date}
            class={
              result.koepelInfo.find(
                (koepel) => koepel.koepel_ID == ddl.koepel_ID
              ).vak_name
            }
          />
        );
      }),
      result.deadlineBasicInfo.filter(thirtyDaysFilter).map((ddl) => {
        return (
          <Deadline
            name={ddl.deadline_name}
            date={ddl.deadline_date}
            class={
              result.koepelInfo.find(
                (koepel) => koepel.koepel_ID == ddl.koepel_ID
              ).vak_name
            }
          />
        );
      }),
      result.deadlineBasicInfo.filter(laterFilter).map((ddl) => {
        return (
          <Deadline
            name={ddl.deadline_name}
            date={ddl.deadline_date}
            class={
              result.koepelInfo.find(
                (koepel) => koepel.koepel_ID == ddl.koepel_ID
              ).vak_name
            }
          />
        );
      }),
    ];

    /*result.deadlineBasicInfo.map((ddl) => {
      return <Deadline />;
    });*/
    setDeadlineInhoud(assembly);
  }

  function getDeadlineLength(arg) {
    if (!deadlineInhoud) {
    } else {
      return deadlineInhoud[arg].length;
    }
  }

  function getInhoudOpacity(arg) {
    if (!deadlineInhoud) {
    } else {
      return deadlineInhoud[arg].length + 0.5;
    }
  }

  const deadlineOphalen = async () => {
    const loginData = {
      traject: sessionStorage.getItem("traject"),
    };
    const JSONLoginData = JSON.stringify(loginData);

    const endpoint = "api/getDeadlineBasic";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "applications/json",
      },
      body: JSONLoginData,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(result);
    readDeadlines(result);
  };

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
    deadlineOphalen();
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
    } else if (date.getHours() > 21) {
      return "calc(100% - 2px)";
    } else {
      return (date.getHours() - 6) * 24 + 2 + date.getMinutes() * 0.4;
    }
  }

  return (
    <div>
      <div className={styles.vandaag__container}>
        <div
          className={styles.vandaag__weekView}
          style={{ gridTemplateColumns: weekViewGrid }}
        >
          {preWeekContent}
          <Klok
            areaStyling={klokGridArea}
            staticWeekDay={staticWeekDay}
            staticNumDay={staticNumDay}
            staticTxtMonth={staticTxtMonth}
            staticHours={staticHours}
            staticMinutes={staticMinutes}
            staticSeconds={staticSeconds}
          />
          {postWeekContent}
        </div>

        <main className={styles.vandaag__sections}>
          <section>
            <div className={styles.rooster}>
              <h1 className={styles.rooster__title}>Les vandaag</h1>
              {roosterInhoud}
              <p className={styles.rooster__noClass + " " + lesVandaag}>
                geen geplande lessen vandaag
              </p>
              <div
                className={styles.rooster__slider}
                style={{ marginTop: sliderOffsetCalc() + "px" }}
              ></div>
            </div>
          </section>
          <section>
            <h1 className={styles.rooster__title}>Komende Deadlines</h1>
            <ul className={styles.deadline__container}>
              <p
                className={styles.deadlines__splitter}
                style={{ opacity: getInhoudOpacity(0) }}
              >
                <span>Vandaag &emsp;</span>
                <span>{getDeadlineLength(0)}</span>
              </p>
              {deadlineInhoud[0]}
              <p
                className={styles.deadlines__splitter}
                style={{ opacity: getInhoudOpacity(1) }}
              >
                <span>Deze week &emsp;</span>
                <span>{getDeadlineLength(1)}</span>
              </p>
              {deadlineInhoud[1]}
              <p
                className={styles.deadlines__splitter}
                style={{ opacity: getInhoudOpacity(2) }}
              >
                <span>Deze maand &emsp;</span>
                <span>{getDeadlineLength(2)}</span>
              </p>
              {deadlineInhoud[2]}
              <p
                className={styles.deadlines__splitter}
                style={{ opacity: getInhoudOpacity(3) }}
              >
                <span>Later &emsp;</span>
                <span>{getDeadlineLength(3)}</span>
              </p>
              {deadlineInhoud[3]}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
