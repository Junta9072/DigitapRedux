import { useState, useEffect } from "react";
import styles from "../../styles/LeftNav.module.css";

export default function LeftNav__item(props) {
  function checkActiveContent(nummer) {
    if (nummer == props.activeContent) {
      return styles.active;
    } else {
      return;
    }
  }

  return (
    <li
      className={
        styles.leftNav__item + " " + checkActiveContent(props.position)
      }
      onClick={() => props.changeActive(props.position)}
    >
      <div
        className={styles.leftNav__icon}
        style={{ backgroundImage: props.icon }}
      ></div>
      <p className={styles.letNav__title}>{props.title}</p>
    </li>
  );
}
