import styles from "../../../styles/Vandaag.module.css";
import { useEffect, useState } from "react";
import { addDays, getDayDiff } from "../../../helpers/time";

import Deadline from "../deadline";

export default function DeadlinesAll(props) {
  const [deadlineInhoud, setDeadlineInhoud] = useState("");

  const navigate = (arg) => {
    console.log("upward deadlinesAll " + arg);
    props.navigate(arg);
  };

  let date = new Date();

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
              navigate={navigate}
            />
          );
        }),
      result.deadlineBasicInfo.filter(sevenDaysFilter).map((ddl) => {
        return (
          <Deadline
            koepel={ddl.koepel_ID}
            name={ddl.deadline_name}
            date={ddl.deadline_date}
            class={
              result.koepelInfo.find(
                (koepel) => koepel.koepel_ID == ddl.koepel_ID
              ).vak_name
            }
            navigate={navigate}
          />
        );
      }),
      result.deadlineBasicInfo.filter(thirtyDaysFilter).map((ddl) => {
        return (
          <Deadline
            koepel={ddl.koepel_ID}
            name={ddl.deadline_name}
            date={ddl.deadline_date}
            class={
              result.koepelInfo.find(
                (koepel) => koepel.koepel_ID == ddl.koepel_ID
              ).vak_name
            }
            navigate={navigate}
          />
        );
      }),
      result.deadlineBasicInfo.filter(laterFilter).map((ddl) => {
        return (
          <Deadline
            koepel={ddl.koepel_ID}
            name={ddl.deadline_name}
            date={ddl.deadline_date}
            class={
              result.koepelInfo.find(
                (koepel) => koepel.koepel_ID == ddl.koepel_ID
              ).vak_name
            }
            navigate={navigate}
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

  useEffect(() => {
    deadlineOphalen();
  }, []);

  return (
    <ul className={styles.deadline__container + " " + styles.deadlinesSection}>
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
  );
}
