import { SERVER_PROPS_ID } from "next/dist/shared/lib/constants";
import styles from "../../../styles/Vandaag.module.css";

export default function WeekRooster(props) {
  return (
    <>
      {/* grid container 7col x 24rows */}
      <div className={styles.rooster__weekView}>
        <p className={styles.week__dayName} style={{ gridArea: "maandag" }}>
          ma
        </p>
        <p className={styles.week__dayName} style={{ gridArea: "dinsdag" }}>
          di
        </p>
        <p className={styles.week__dayName} style={{ gridArea: "woensdag" }}>
          wo
        </p>
        <p className={styles.week__dayName} style={{ gridArea: "donderdag" }}>
          do
        </p>
        <p className={styles.week__dayName} style={{ gridArea: "vrijdag" }}>
          vr
        </p>
        {props.inhoud}
      </div>
    </>
  );
}
