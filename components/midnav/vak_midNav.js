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
    props.setRightNav(arg);
    console.log("up!");
  }

  function checkActiveVak(arg) {
    if (arg == props.activeVak) {
      console.log(arg);
      return styles.vakken__active;
    } else {
      return undefined;
    }
  }

  function getActiveVak() {
    return props.activeVak;
  }

  function getVakIcon(name) {
    let letter = name.slice(0, 1);
    let number = name.slice(-1);
    let srcComp = "icon" + letter + "blk.svg";
    //return <img src={srcComp} className={styles.vakken__img} />;
    return (
      <>
        <div className={styles.vakken__imgContainer}>
          <img src={srcComp} className={styles.vakken__img} />
        </div>
        {/*<p className={styles.vakken__number}>{number}</p>*/}
      </>
    );
  }

  let vakCounter = 1;
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
                console.log(props.activeVak);
              }}
            >
              <div className={styles.vakken__icon}>
                {getVakIcon(vak.vak_name)}
              </div>
              <span className={styles.vakken__title}>{vak.vak_name}</span>
            </li>
          );
        })
      );
    }
  }

  useEffect(() => {
    trajectOphalen();
    deadlineOphalen();
  }, [props.activeVak]);

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
          <div className={styles.vakken__No}></div>
        </li>
      </ul>
      <ul class={styles.midNav__classes}>{trajectListing}</ul>
    </>
  );
}
