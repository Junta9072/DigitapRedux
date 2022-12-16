import { useEffect, useState } from "react";
import styles from "../../styles/MidNav.module.css";

export default function Rooster_MidNav(props) {
  props.setRightNav(0);
  function changeActiveVak(arg) {
    props.setRightNav(arg);
  }

  let roosterData = {
    trajecten: [
      { traject_name: "3GDM IDL-CEC", koepel_ID: 1 },
      { traject_name: "2GDM IDL", koepel_ID: 2 },
    ],
  };

  function roosterMenu() {}

  return (
    <>
      <ul className={styles.vakken__general}>
        <h1 className={styles.vakken__subtitle}>3 GDM IDL</h1>
        <li className={styles.vakken__item}>
          <i className={"material-icons-outlined " + styles.md24}>&#xe916;</i>
          <span>Deze week</span>
        </li>
        <li className={styles.vakken__item}>
          <i className={"material-icons-outlined " + styles.md24}>&#xebcc;</i>
          <span>Deze Maand</span>
        </li>
        <li className={styles.vakken__item}>
          <i className={"material-icons-outlined " + styles.md24}>&#xe935;</i>
          <span>Komende 30 dagen</span>
        </li>
      </ul>
      <ul className={styles.vakken__general}>
        <h1 className={styles.vakken__subtitle}>2 GDM IDL</h1>
        <li className={styles.vakken__item}>
          <i className={"material-icons-outlined " + styles.md24}>&#xe916;</i>
          <span>Deze week</span>
        </li>
        <li className={styles.vakken__item}>
          <i className={"material-icons-outlined " + styles.md24}>&#xebcc;</i>
          <span>Deze Maand</span>
        </li>
        <li className={styles.vakken__item}>
          <i className={"material-icons-outlined " + styles.md24}>&#xe935;</i>
          <span>Komende 30 dagen</span>
        </li>
      </ul>
      <div className={styles.input__container}>
        <i className={"material-icons-outlined " + styles.md24}>search</i>
        <input
          type="text"
          placeholder="andere roosters"
          className={styles.vakken__input}
        />
      </div>
    </>
  );
}
