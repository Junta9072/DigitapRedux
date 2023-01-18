import { useEffect, useState } from "react";
import Klok from "./klok";

import Rooster_item from "./roosterItem";
import WeekRooster_item from "./weekRooster_Item";
import VandaagRooster from "./rooster/vandaagRooster";
import DeadlinesAll from "./deadlines/deadlinesAll";
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
import WeekRooster from "./rooster/weekRooster";

export default function Vandaag(props) {
  const [hours, setHours] = useState(hms.hour);
  const [minutes, setMinutes] = useState(hms.minutes);
  const [seconds, setSeconds] = useState(hms.seconds);

  //rooster useStates
  const [lesVandaag, setLesVandaag] = useState(" ");
  const [roosterInhoud, setRoosterInhoud] = useState("-");
  const [roosterSwitch, setRoosterSwitch] = useState(0);
  const [weekInhoud, setWeekInhoud] = useState("");
  const [lesSectionInhoud, setLesSectionInhoud] = useState();

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

  const navigate = (arg) => {
    console.log("upward vandaag " + arg);
    props.navigate(arg);
  };

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
    let postweekReturn = assembly.map((day, i) => {
      counter = counter - 1;
      return (
        <div className={styles.weekView__weekDay} key={i}>
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

  function ongoingFilter(rooster_item) {
    return (
      new Date(rooster_item.date_start) < date &&
      new Date(rooster_item.date_end) > date
    );
  }

  function getRoosterSwitch(arg) {
    if (arg == roosterSwitch) {
      return styles.roosterSwitch__active;
    } else {
      return "";
    }
  }
  function switchRooster(arg) {
    setRoosterSwitch(arg);
    if (arg == 0) {
      setLesSectionInhoud(
        <VandaagRooster
          inhoud={roosterInhoud}
          les={lesVandaag}
          slider={sliderOffsetCalc()}
        />
      );
    } else {
      setLesSectionInhoud(<WeekRooster />);
    }
  }

  function readRooster(obj) {
    if (obj.roosterInfo.filter(dotWfilter).length != 0) {
      setLesVandaag(styles.rooster__class);
    }

    setRoosterInhoud(
      obj.roosterInfo.filter(dotWfilter).map((rooster_item, i) => {
        return <Rooster_item data={rooster_item} navigate={navigate} key={i} />;
      })
    );
    setWeekInhoud(
      obj.roosterInfo.filter(ongoingFilter).map((rooster_item, i) => {
        return (
          <WeekRooster_item data={rooster_item} navigate={navigate} key={i} />
        );
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
    console.log(result);
    readRooster(result);
  };

  function getLesSectionContent() {
    if (roosterSwitch == 0) {
      setLesSectionInhoud(
        <VandaagRooster
          inhoud={roosterInhoud}
          les={lesVandaag}
          slider={sliderOffsetCalc()}
        />
      );
    } else {
      setLesSectionInhoud(
        <WeekRooster
          inhoud={weekInhoud}
          les={lesVandaag}
          slider={sliderOffsetCalc()}
        />
      );
    }
  }

  useEffect(() => {
    roosterOphalen();
  }, [roosterSwitch]);

  useEffect(() => {
    getLesSectionContent();
  }, [roosterInhoud, weekInhoud]);

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
            <h3 className={styles.rooster__title}>Lessen</h3>
            <div className={styles.rooster__options}>
              <p
                className={getRoosterSwitch(0)}
                onClick={() => {
                  switchRooster(0);
                }}
              >
                Vandaag
              </p>
              <p
                className={getRoosterSwitch(1)}
                onClick={() => {
                  switchRooster(1);
                }}
              >
                Week
              </p>
            </div>
            <div className={styles.lesContainer}>{lesSectionInhoud}</div>
          </section>
          <section>
            <h1 className={styles.rooster__title}>Komende Deadlines</h1>
            <DeadlinesAll navigate={navigate} />
          </section>
        </main>
      </div>
    </div>
  );
}
