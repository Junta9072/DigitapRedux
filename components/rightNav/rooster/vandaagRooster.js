import styles from "../../../styles/Vandaag.module.css";

export default function VandaagRooster(props) {
  return (
    <div className={styles.rooster}>
      {props.inhoud}
      <p className={styles.rooster__noClass + " " + props.les}>
        geen geplande lessen vandaag
      </p>
      <div
        className={styles.rooster__slider}
        style={{ marginTop: props.slider + "px" }}
      ></div>
    </div>
  );
}
