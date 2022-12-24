import { useEffect, useState } from "react";
import styles from "../../styles/MidNav.module.css";

export default function TrajectRoosterTabs(props) {
  function checkActiveVak(arg) {
    if (arg == props.activeVak) {
      console.log(arg);
      return styles.vakken__active;
    } else {
      return undefined;
    }
  }

  return (
    <li>
      <ul className={styles.vakken__general}>
        <h1 className={styles.vakken__subtitle}>{props.data.traject_name}</h1>
        <li
          className={
            styles.vakken__item +
            " " +
            checkActiveVak(props.data.traject_ID * 2 - 2)
          }
          onClick={() => {
            props.changeActiveVak(props.data.traject_ID * 2 - 2);
          }}
        >
          <i className={"material-icons-outlined " + styles.md24}>&#xe916;</i>
          <span>Deze week</span>
        </li>
        <li
          className={
            styles.vakken__item +
            " " +
            checkActiveVak(props.data.traject_ID * 2 - 2 + 1)
          }
          onClick={() => {
            props.changeActiveVak(props.data.traject_ID * 2 - 2 + 1);
          }}
        >
          <i className={"material-icons-outlined " + styles.md24}>&#xebcc;</i>
          <span>Deze Maand</span>
        </li>
      </ul>
    </li>
  );
}
