import { getTxtMonth } from "../../helpers/time";
import styles from "../../styles/AutoVak.module.css";

export default function AVDeadline(props) {
  let ddl = props.ddl;
  let ddlDate = props.date;
  return (
    <li key={props.key} className={styles.upcoming__ddl}>
      <span className={styles.upcoming__ddlTitle}>{ddl.deadline_name}</span>{" "}
      <br />
      <span className={styles.upcoming__ddlDate}>
        {ddlDate.getDate() + " " + getTxtMonth(ddlDate.getMonth())}
      </span>
    </li>
  );
}
