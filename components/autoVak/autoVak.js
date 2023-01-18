import { useState, useEffect, useRef } from "react";
import AVLessen from "./avLessen";
import AVDeadlines from "./avDeadlines";
import VakContent from "./VakContent";
import styles from "../../styles/AutoVak.module.css";

export default function AutoVak(props) {
  const [vakAfkorting, setVakAfkorting] = useState("");
  const [vakTitel, setVakTitel] = useState("");
  const [vakLectoren, setVakLectoren] = useState("");
  const [lessenAPIResult, setLessenAPIResult] = useState("");
  const [vakContentAPIResult, setVakContentAPIResult] = useState("");

  let staticVak = "";

  let buttonPreUseState = [];
  const [buttonAnimation, setButtonAnimation] = useState("");
  function copyEmail(e, i) {
    console.log(buttonPreUseState);
    console.log(e.target.childNodes[1].data);
    buttonPreUseState[i] = styles.kakaANI;
    setButtonAnimation(buttonPreUseState);
  }

  //asnyc vak info ophalen
  const VakInfoOphalen = async () => {
    const loginData = {
      vak: props.vak,
    };
    const JSONLoginData = JSON.stringify(loginData);

    const endpoint = "api/autoVakFormatter";
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
    setVakTitel(result.vakBasicInfo[0].vak_fullname);
    setVakAfkorting(result.vakBasicInfo[0].vak_name);
    setVakLectoren(
      result.lectorPickingInfo.map((lector, i) => {
        buttonPreUseState.push("");
        console.log(buttonPreUseState);
        return (
          <div
            className={styles.autoVak__lector + " " + buttonAnimation[i]}
            onClick={(e) => {
              copyEmail(e, i);
            }}
          >
            <div className={styles.autoVak__nameAndEmail}>
              <p className={styles.autoVak__email}>
                <div className={styles.lector__email}>
                  <i
                    className={
                      styles.lector__icon + " material-icons-outlined "
                    }
                  >
                    copy
                  </i>
                  {lector.lector_email}
                </div>

                <div className={styles.autoVak__copyCover}>
                  <div className={styles.autoVak__copyBg}></div>
                  <p className={styles.autoVak__copyTxt}>Copied!</p>
                </div>
              </p>
              <p className={styles.autoVak__name}>
                <i className={"material-icons-outlined " + styles.lector__icon}>
                  person
                </i>
                {lector.lector_name}
              </p>
            </div>
          </div>
        );
      })
    );
    setLessenAPIResult(result.lessenInfo);
  };

  const VakContentOphalen = async () => {
    const loginData = {
      bundle: staticVak,
    };
    const JSONLoginData = JSON.stringify(loginData);

    const endpoint = "api/getAutoVakContent";
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
    setVakContentAPIResult(result);
  };

  useEffect(() => {
    VakInfoOphalen();
    if (props.vak == 1) {
      staticVak = 2;
    } else {
      staticVak = 1;
    }
    VakContentOphalen();
  }, [props.vak, buttonAnimation]);
  //damn
  return (
    <div className={styles.autoVak__container}>
      <div className={styles.autoVak__scrollable}>
        <header className={styles.autoVak__header}>
          <p className={styles.autoVak__abr}>{vakAfkorting}</p>
          <h1 className={styles.autoVak__title}>{vakTitel}</h1>
        </header>
        <div className={styles.autoVak__lectoren}>{vakLectoren}</div>
        <main className={styles.autoVak__content}>
          <VakContent content={vakContentAPIResult} />
        </main>
      </div>
      <section className={styles.upcoming__section}>
        <AVLessen data={lessenAPIResult} vakName={vakAfkorting} />
        <AVDeadlines vak={props.vak} vakName={vakAfkorting} />
      </section>
    </div>
  );
}
