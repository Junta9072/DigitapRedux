import { useEffect, useState } from "react";
import styles from "../../styles/MidNav.module.css";

export default function Tools_MidNav() {
  return (
    <ul className={styles.vakken__general}>
      <li className={styles.vakken__item + " " + styles.admin__item}>
        <i className={"material-icons-outlined " + styles.md24}>book</i>
        <span>uitlenen bij AP</span>
      </li>
      <li className={styles.vakken__item + " " + styles.admin__item}>
        <i className={"material-icons-outlined " + styles.md24}>support</i>
        <span>Ondersteuning bij examens</span>
      </li>
      <li className={styles.vakken__item + " " + styles.admin__item}>
        <i className={"material-icons-outlined " + styles.md24}>
          support_agent
        </i>
        <span>Digitale ondersteuning</span>
      </li>
      <li className={styles.vakken__item + " " + styles.admin__item}>
        <i className={"material-icons-outlined " + styles.md24}>bolt</i>
        <span>OnderNemen bij AP</span>
      </li>
      <li className={styles.vakken__item + " " + styles.admin__item}>
        <i className={"material-icons-outlined " + styles.md24}>psychology</i>
        <span>AP vaardig</span>
      </li>
      <li className={styles.vakken__item + " " + styles.admin__item}>
        <i className={"material-icons-outlined " + styles.md24}>visibility</i>
        <span>Panopto</span>
      </li>
      <li className={styles.vakken__item + " " + styles.admin__item}>
        <i className={"material-icons-outlined " + styles.md24}>language</i>
        <span>Intranet</span>
      </li>
      <li className={styles.vakken__item + " " + styles.admin__item}>
        <i className={"material-icons-outlined " + styles.md24}>emoji_events</i>
        <span>Portfolio</span>
      </li>
    </ul>
  );
}
