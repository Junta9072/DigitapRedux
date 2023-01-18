import { useEffect, useState } from "react";
import styles from "../../styles/AutoVak.module.css";
import { getTxtMonth } from "../../helpers/time";
import FileDropZone from "./fileDropZone";

export default function TinyDeadline(props) {
  const [deadlineContent, setDeadlineContent] = useState("");
  const [staticDate, setStaticDate] = useState("p");

  function renderTinyDeadline(result) {
    let tiny = result.find((ddl) => ddl.ID == props.id);
    console.log(props.id);
    console.log(tiny);

    console.log(tiny);

    return (
      <div className={styles.tinyDeadline}>
        <div className={styles.tinyDdl__header}>
          <p className={styles.upcoming__ddlTitle}>{tiny.deadline_name}</p>
          <p className={styles.upcoming__ddlDate}>
            {new Date(tiny.deadline_date).getDate() +
              " " +
              getTxtMonth(new Date(tiny.deadline_date).getMonth()) +
              " " +
              new Date(tiny.deadline_date).getHours() +
              "u" +
              new Date(tiny.deadline_date).getMinutes()}
          </p>
        </div>
        <p className={styles.tinyDdl__desc}>{tiny.deadline_desc}</p>
        {<FileDropZone id={props.id} />}
      </div>
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
    setDeadlineContent(renderTinyDeadline(result.deadlineBasicInfo));

    let tiny = result.deadlineBasicInfo.find((ddl) => ddl.ID == props.id);
    let ddlDate = new Date(tiny.deadline_date);

    setStaticDate(
      ddlDate.getDate() +
        " " +
        getTxtMonth(ddlDate.getMonth()) +
        " " +
        ddlDate.getHours() +
        "u" +
        ddlDate.getMinutes()
    );
  };

  useEffect(() => {
    deadlineOphalen();
  }, [props]);

  return <div>{deadlineContent}</div>;
}
