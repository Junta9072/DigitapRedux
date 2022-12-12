import styles from "../../styles/AutoVak.module.css";

export default function AVLes(props) {
  return (
    <div className={styles.upcoming__les}>
      <div className={styles.upcoming__vakInfo}>
        <span className={styles.upcoming__vakTitle}>
          {props.data.date}
          &ensp;
          <span>{props.data.month}</span>
        </span>
        <span className={styles.upcoming__vakLocation}>
          {props.location.vak_location_campus}
          {props.location.vak_location_room}
        </span>
      </div>

      <p className={styles.upcoming__vakLocation}>
        {props.location.hour_start.slice(0, 5)}
        &thinsp; &mdash; &thinsp;
        {props.location.hour_end.slice(0, 5)}
      </p>
    </div>
  );
}
