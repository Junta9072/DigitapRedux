import { useState, useEffect, useDebugValue } from "react";
import styles from "../../styles/rooster.module.css";
import { getTxtMonth, txtMonth, addDays } from "../../helpers/time";
import WeekGrid from "./rooster/weekGrid";
import RoosterModal from "./rooster/roosterModal";

export default function WeekOverView(props) {
  let date = new Date();
  const [staticTxtMonth, setStaticTxtMonth] = useState("");
  const [staticYear, setStaticYear] = useState("");
  const [weekGrid, setWeekGrid] = useState("");
  const [weekDates, setWeekDates] = useState("");

  const [ongoingVakken, setOngoingVakken] = useState("");
  const [monthDeadlines, setMonthDeadlines] = useState("");
  const [koepelData, setKoepelData] = useState("");

  const [modalProp, setModalProp] = useState("");
  const [modalTrigger, setModalTrigger] = useState(false);

  const navigate = (arg, section) => {
    console.log(arg, section);
    props.navigate(arg, section);
  };

  function getModalProps(arg) {
    let assembly = "";
    let tempDotW = new Date(date.getFullYear(), date.getMonth(), arg);

    let matchingLessen = ongoingVakken.filter(
      (les) => les.dotW == tempDotW.getDay()
    );
    let matchingDdl = monthDeadlines.filter(
      (ddl) =>
        new Date(ddl.deadline_date).getMonth() == date.getMonth() &&
        new Date(ddl.deadline_date).getDate() == tempDotW.getDate()
    );
    setModalProp({
      les: matchingLessen,
      ddl: matchingDdl,
      koepel: koepelData,
      date: arg,
    });
  }

  function toggleModal(date) {
    if (modalTrigger == false) {
      setModalTrigger(true);
      getModalProps(date);
    } else {
      setModalTrigger(false);
    }
  }

  useEffect(() => {
    setStaticTxtMonth(getTxtMonth(date.getMonth()));
    setStaticYear(date.getFullYear());
    setWeekDates(
      new Date(addDays(date, -date.getDay())).getDate() +
        "—" +
        new Date(addDays(date, 7 - date.getDay())).getDate()
    );
  }, []);

  function ongoingFilter(rooster_item) {
    return (
      new Date(rooster_item.date_start) < date &&
      new Date(rooster_item.date_end) > date
    );
  }

  function thisMonthFilter(ddl) {
    let dDate = new Date(ddl.deadline_date);
    return (
      dDate.getMonth() == date.getMonth() &&
      dDate.getDate() >= new Date(addDays(date, -date.getDay())).getDate() &&
      dDate.getDate() <= new Date(addDays(date, 7 - date.getDay())).getDate()
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
    setOngoingVakken(result.roosterInfo.filter(ongoingFilter));
  };

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
    setMonthDeadlines(result.deadlineBasicInfo.filter(thisMonthFilter));
    setKoepelData(result.koepelInfo);
    console.log(monthDeadlines);
  };

  useEffect(() => {
    deadlineOphalen();
    roosterOphalen();
  }, []);

  return (
    <div>
      <header className={styles.rooster__header}>
        <p className={styles.header__year}>{staticYear}</p>
        <h2 className={styles.header__title}>
          {weekDates}
          &ensp;{staticTxtMonth}
        </h2>
      </header>
      <main className={styles.rooster__main}>
        <div className={styles.rooster__weekgrid}>
          <WeekGrid
            ddl={monthDeadlines}
            les={ongoingVakken}
            koepel={koepelData}
            modal={toggleModal}
          />
        </div>
        <RoosterModal
          data={modalProp}
          vis={modalTrigger}
          modal={toggleModal}
          koepel={koepelData}
          navigate={navigate}
        />
      </main>
    </div>
  );
}
