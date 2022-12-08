import { useState, useEffect } from "react";
import styles from "../../styles/MidNav.module.css";

export default function Vak_MidNav(props) {
  const [trajectData, setTrajectData] = useState("");
  const [trajectListing, setTrajectListing] = useState("leeg");
  const [activeVak, setActiveVak] = useState("1");

  const trajectOphalen = async () => {
    const loginData = {
      traject: sessionStorage.getItem("traject"),
    };
    const JSONLoginData = JSON.stringify(loginData);

    const endpoint = "api/getTraject";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "applications/json",
      },
      body: JSONLoginData,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    setTrajectData(result.trajectInfo);
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
    console.log(result);
  };

  function changeActiveVak(arg) {
    setActiveVak(arg);
    props.setRightNav(arg);
  }

  function checkActiveVak(arg) {
    if (arg == activeVak) {
      console.log(arg);
      return styles.vakken__active;
    } else {
      return undefined;
    }
  }

  function getActiveVak() {
    return activeVak;
  }

  let vakCounter = 4;
  function mapTraject() {
    if (!trajectData) {
      setTrajectListing("kon geen data vinden");
    } else {
      setTrajectListing(
        trajectData.map((vak) => {
          vakCounter++;
          return (
            <li
              className={styles.vakken__vak + " " + checkActiveVak(vakCounter)}
              key={vak.vak_name}
              data-count={vakCounter}
              onClick={(e) => {
                changeActiveVak(parseInt(e.target.getAttribute("data-count")));
                console.log(activeVak);
              }}
            >
              <span className={styles.vakken__title}>{vak.vak_name}</span>
              <div className={styles.vakken__live}></div>
              <div className={styles.vakken__notificationCounter}>0</div>
              <div className={styles.vakken__deadlineCounter}>0</div>
            </li>
          );
        })
      );
    }
  }

  useEffect(() => {
    trajectOphalen();
    deadlineOphalen();
  }, [activeVak]);

  useEffect(() => {
    mapTraject();
  }, [trajectData]);

  return (
    <>
      <ul className={styles.vakken__general}>
        <li
          className={styles.vakken__item + " " + checkActiveVak(1)}
          onClick={() => changeActiveVak(1)}
        >
          <i className={"material-icons-outlined " + styles.md24}>today</i>
          <span>Overzicht</span>
          <div className={styles.vakken__No}>0</div>
        </li>
        <li
          className={styles.vakken__item + " " + checkActiveVak(2)}
          onClick={() => changeActiveVak(2)}
        >
          <i className={"material-icons-outlined " + styles.md24}>upcoming</i>
          <span>Alle deadlines</span>
          <div className={styles.vakken__No}>0</div>
        </li>
        <li
          className={styles.vakken__item + " " + checkActiveVak(3)}
          onClick={() => changeActiveVak(3)}
        >
          <i className={"material-icons-outlined " + styles.md24}>&#xe916;</i>
          <span>Komende 7 dagen</span>
          <div className={styles.vakken__No}>0</div>
        </li>
        <li
          className={styles.vakken__item + " " + checkActiveVak(4)}
          onClick={() => changeActiveVak(4)}
        >
          <i className={"material-icons-outlined " + styles.md24}>&#xebcc;</i>
          <span>Komende 30 dagen</span>
          <div className={styles.vakken__No}>0</div>
        </li>
      </ul>
      <ul class={styles.midNav__classes}>{trajectListing}</ul>
    </>
  );
}
