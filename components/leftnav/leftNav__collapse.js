import styles from "../../styles/LeftNav.module.css";

export default function LeftNav__collapse(props) {
  return (
    <div
      className={styles.leftNav__collapse}
      onClick={() => props.toggleSize()}
    >
      <img src={"collapse.svg"}></img>
    </div>
  );
}
