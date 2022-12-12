import { useEffect, useState } from "react";
import { getWeekDay, getTxtMonth } from "../../helpers/time";
import styles from "../../styles/AutoVak.module.css";

import AVDeadline from "./AVDeadline.js";

export default function AVDeadlines(props) {
  const [vakDeadlines, setVakDeadlines] = useState("");

  function filterDeadlines(deadline) {
    return deadline.koepel_ID == props.vak;
  }

  function renderDeadlines(input) {
    let filterDdl = input.filter(filterDeadlines);
    setVakDeadlines(
      filterDdl.map((ddl, i) => {
        let ddlDate = new Date(ddl.deadline_date);
        return <AVDeadline ddl={ddl} key={i} date={ddlDate} />;
      })
    );
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
    renderDeadlines(result.deadlineBasicInfo.filter(filterDeadlines));
  };

  useEffect(() => {
    deadlineOphalen();
  }, [props.vak]);
  return (
    <ul>
      <p className={styles.upcoming__title}>Deadlines:</p>
      {vakDeadlines}
    </ul>
  );
}
