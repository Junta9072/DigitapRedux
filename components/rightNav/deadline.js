import { getTxtMonth } from "../../helpers/time";
import styles from "../../styles/Vandaag.module.css";

export default function Deadline(props) {
  let ddlDate = new Date(props.date);
  return (
    <div
      className={styles.deadlines__item}
      onClick={() => props.navigate(props.koepel)}
    >
      <p className={styles.deadlines__title}>{props.name}</p>
      <p className={styles.deadlines__subtitle}>
        <span className={styles.deadlines__vak}>{props.class}</span>
        <span className={styles.deadlines__date}>
          {ddlDate.getDate() + " " + getTxtMonth(ddlDate.getMonth())}
        </span>
      </p>
    </div>
  );
}
