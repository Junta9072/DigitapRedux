import { getTxtMonth } from "../../helpers/time";
import styles from "../../styles/Vandaag.module.css";

export default function Deadline(props) {
  let ddlDate = new Date(props.date);
  return (
    <div className={styles.deadlines__item}>
      <p className={styles.deadlines__title}>{props.name}</p>
      <p className={styles.deadlines__date}>
        {ddlDate.getDate() + " " + getTxtMonth(ddlDate.getMonth())}
      </p>
    </div>
  );
}
