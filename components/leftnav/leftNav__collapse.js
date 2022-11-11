import styles from "../../styles/LeftNav.module.css";

export default function LeftNav__collapse(props) {
  return (
    <div
      className={styles.leftNav__collapse}
      onClick={() => props.toggleSize()}
    >
      <div className={styles.collapse__spacer}></div>
      <div className={styles.collapse__container}>
        <div className={styles.collapse__img}></div>
      </div>
      <p className={styles.collapse__text}>Inklappen</p>
    </div>
  );
}
