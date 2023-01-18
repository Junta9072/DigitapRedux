import { useState, useEffect } from "react";
import {
  getTxtMonth,
  getMonthLength,
  getAcademicYear,
} from "../../helpers/time";
import styles from "../../styles/rooster.module.css";
import MonthGridItem from "./rooster/monthGridItem";
import RoosterModal from "./rooster/roosterModal";

export default function MonthOverview(props) {
  const [splitMonth, setSplitMonth] = useState("");
  const [calenderItems, setCalenderItems] = useState("");
  const [staticTxtMonth, setStaticTxtMonth] = useState("");
  const [staticYear, setStaticYear] = useState("");
  const [tinyCal, setTinyCal] = useState("");
  const [spacerWidth, setSpacerWidth] = useState("");
  const [weekAmount, setWeekAmount] = useState("");
  const [monthContent, setMonthContent] = useState("");
  const [academicYear, setAcademicYear] = useState("");

  const [ongoingVakken, setOngoingVakken] = useState("");
  const [monthDeadlines, setMonthDeadlines] = useState("");
  const [koepelData, setKoepelData] = useState("");

  const [modalProp, setModalProp] = useState("");
  const [modalTrigger, setModalTrigger] = useState(false);

  let date = new Date();

  const navigate = (arg, section) => {
    console.log(arg, section);
    props.navigate(arg, section);
  };

  function checkOngoing(arg) {
    if (arg + 1 == date.getDate()) {
      return styles.tinyCal__active;
    } else {
      return "";
    }
  }

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
        return (
          <MonthGridItem
            key={i}
            day={i + 1}
            spacer={spacerWidth}
            les={ongoingVakken}
            ddl={monthDeadlines}
            modal={toggleModal}
          />
        );
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
    console.log(firstDay.getDay());
    if (firstDay.getDay > 0) {
      setSpacerWidth(firstDay.getDay() - 1);
    } else {
      setSpacerWidth(6);
    }
  }

  function ongoingFilter(rooster_item) {
    return (
      new Date(rooster_item.date_start) < date &&
      new Date(rooster_item.date_end) > date
    );
  }

  function thisMonthFilter(ddl) {
    return new Date(ddl.deadline_date).getMonth() == date.getMonth();
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
  };

  useEffect(() => {
    setStaticTxtMonth(getTxtMonth(date.getMonth()));
    setStaticYear(date.getFullYear());
    calcSpacer();
  }, []);

  useEffect(() => {
    roosterOphalen();
    deadlineOphalen();
    console.log([ongoingVakken, monthDeadlines]);
    setAcademicYear(getAcademicYear(date));
  }, []);

  useEffect(() => {
    generateMonthItems();
    setWeekAmount(
      Math.ceil((getMonthLength(date.getMonth()) + spacerWidth) / 7)
    );
  }, [spacerWidth, ongoingVakken, monthDeadlines]);

  return (
    <div className={styles.monthView__container}>
      <div className={styles.sider}>
        <div className={styles.acYear}>
          <p className={styles.acYear__date}>{academicYear}</p>
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
        {calenderItems}
      </div>
      <RoosterModal
        navigate={navigate}
        data={modalProp}
        vis={modalTrigger}
        modal={toggleModal}
        koepel={koepelData}
      />
    </div>
  );
}
