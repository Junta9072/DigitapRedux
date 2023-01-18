import styles from "../../../styles/vakContent.module.css";

export default function ContentMessageBoard(props) {
  return (
    <div className={styles.content__container}>
      <div className={styles.content__body}>
        <p className={styles.content__text}>{props.data.content_textContent}</p>
      </div>
    </div>
  );
}
