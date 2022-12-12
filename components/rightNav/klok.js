import styles from "../../styles/Vandaag.module.css";

export default function Klok(props) {
  return (
    <header
      className={styles.header__container}
      style={{ gridArea: props.areaStyling }}
    >
      <h1 className={styles.header__weekday}>{props.staticWeekDay}</h1>
      <div className={styles.header__content}>
        <span className={styles.header__numDay}>{props.staticNumDay}</span>
        <span className={styles.header__txtMonth}>{props.staticTxtMonth}</span>
        <div className={styles.header__hms}>
          <span className={styles.header__hours}>{props.staticHours}</span>
          <span className={styles.header__minutes}>{props.staticMinutes}</span>
          <span className={styles.header__seconds}>{props.staticSeconds}</span>
        </div>
      </div>
    </header>
  );
}
