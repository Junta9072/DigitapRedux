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
    let preWeek = dotW - 1;
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
    let postWeek = 7 - dotW;
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

  useEffect(() => {
    setPreWeekContent(getPreWeek());
    setpostWeekContent(getPostWeek());
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
          return <Deadline name={ddl.deadline_name} date={ddl.deadline_date} />;
        }),
      result.deadlineBasicInfo.filter(sevenDaysFilter).map((ddl) => {
        return <Deadline name={ddl.deadline_name} date={ddl.deadline_date} />;
      }),
      result.deadlineBasicInfo.filter(thirtyDaysFilter).map((ddl) => {
        return <Deadline name={ddl.deadline_name} date={ddl.deadline_date} />;
      }),
      result.deadlineBasicInfo.filter(laterFilter).map((ddl) => {
        return <Deadline name={ddl.deadline_name} date={ddl.deadline_date} />;
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
      return (date.getHours() - 7) * 24 + 2 + date.getMinutes() * 0.4;
    }
  }

  return (
    <div>
      <div className={styles.vandaag__container}>
        <div className={styles.vandaag__weekView}>
          {preWeekContent}
          <Klok
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
          </section>
        </main>
      </div>
    </div>
  );
}
