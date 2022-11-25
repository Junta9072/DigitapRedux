import { useEffect, useState } from "react";
import styles from "../../styles/MidNav.module.css";

export default function Account_MidNav() {
  return (
    <ul className={styles.vakken__general}>
      <li className={styles.vakken__item + " " + styles.admin__item}>
        <i className={"material-icons-outlined " + styles.md24}>save</i>
        <span>Mijn gegevens</span>
      </li>
      <li className={styles.vakken__item + " " + styles.admin__item}>
        <i className={"material-icons-outlined " + styles.md24}>tune</i>
        <span>Mijn voorkeuren</span>
      </li>
      <li className={styles.vakken__item + " " + styles.admin__item}>
        <i className={"material-icons-outlined " + styles.md24}>info</i>
        <span>Over Digitap</span>
      </li>
      <li className={styles.vakken__item + " " + styles.admin__item}>
        <i className={"material-icons-outlined " + styles.md24}>logout</i>
        <span>Uitloggen</span>
      </li>
    </ul>
  );
}
