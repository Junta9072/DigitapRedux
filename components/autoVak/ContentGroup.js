import styles from "../../styles/vakContent.module.css";

export default function ContentGroup(props) {
  return (
    <div className={styles.content__container}>
      <h3 className={styles.content__title}>{props.data.content_title}</h3>
      <div className={styles.content__body + " " + styles.content__group}>
        {props.children}
      </div>
    </div>
  );
}
