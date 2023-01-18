import { useEffect, useState } from "react";
import styles from "../../styles/MidNav.module.css";

export default function Tools_MidNav(props) {
  function checkActiveVak(arg) {
    if (arg == props.activeVak) {
      console.log(arg);
      return styles.vakken__active;
    } else {
      return undefined;
    }
  }

  return (
    <ul className={styles.vakken__general}>
      <li
        className={
          styles.vakken__item +
          " " +
          styles.admin__item +
          " " +
          checkActiveVak(1)
        }
      >
        <i className={"material-icons-outlined " + styles.md24}>book</i>
        <span>uitlenen bij AP</span>
      </li>
      <li
        className={
          styles.vakken__item +
          " " +
          styles.admin__item +
          " " +
          checkActiveVak(2)
        }
      >
        <i className={"material-icons-outlined " + styles.md24}>support</i>
        <span>Ondersteuning bij examens</span>
      </li>
      <li
        className={
          styles.vakken__item +
          " " +
          styles.admin__item +
          " " +
          checkActiveVak(3)
        }
      >
        <i className={"material-icons-outlined " + styles.md24}>
          support_agent
        </i>
        <span>Digitale ondersteuning</span>
      </li>
      <li
        className={
          styles.vakken__item +
          " " +
          styles.admin__item +
          " " +
          checkActiveVak(4)
        }
      >
        <i className={"material-icons-outlined " + styles.md24}>bolt</i>
        <span>OnderNemen bij AP</span>
      </li>
      <li
        className={
          styles.vakken__item +
          " " +
          styles.admin__item +
          " " +
          checkActiveVak(5)
        }
      >
        <i className={"material-icons-outlined " + styles.md24}>psychology</i>
        <span>AP vaardig</span>
      </li>
      <li
        className={
          styles.vakken__item +
          " " +
          styles.admin__item +
          " " +
          checkActiveVak(6)
        }
      >
        <i className={"material-icons-outlined " + styles.md24}>visibility</i>
        <span>Panopto</span>
      </li>
      <li
        className={
          styles.vakken__item +
          " " +
          styles.admin__item +
          " " +
          checkActiveVak(7)
        }
      >
        <i className={"material-icons-outlined " + styles.md24}>language</i>
        <span>Intranet</span>
      </li>
      <li
        className={
          styles.vakken__item +
          " " +
          styles.admin__item +
          " " +
          checkActiveVak(8)
        }
      >
        <i className={"material-icons-outlined " + styles.md24}>emoji_events</i>
        <span>Portfolio</span>
      </li>
    </ul>
  );
}
