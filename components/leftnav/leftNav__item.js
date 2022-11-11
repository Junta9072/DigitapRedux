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

  if (props.collapsed == false) {
    return (
      <li
        className={
          styles.leftNav__item + " " + checkActiveContent(props.position)
        }
        onClick={() => props.changeActive(props.position)}
      >
        <div className={styles.icon__container}>
          <div className={styles.icon__bg}>
            <div
              className={styles.icon__img}
              style={{ backgroundImage: props.icon }}
              alt={props.title}
            ></div>
          </div>

          <p className={styles.icon__title}>{props.title}</p>
        </div>
      </li>
    );
  } else {
    return (
      <li
        className={
          styles.leftNav__item + " " + checkActiveContent(props.position)
        }
        onClick={() => props.changeActive(props.position)}
      >
        <div className={styles.item__container}>
          <div className={styles.item__iconbg}>
            <div
              className={styles.item__icon}
              style={{ backgroundImage: props.icon }}
              alt={props.title}
            ></div>
          </div>

          <p className={styles.item__title}>{props.title}</p>
          <div className={styles.item__arrow}></div>
        </div>
      </li>
    );
  }
}
