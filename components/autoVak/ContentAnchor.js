import styles from "../../styles/vakContent.module.css";

export default function ContentAnchor(props) {
  let extra = JSON.parse(props.data.content_extra);

  function getIcons() {
    if (props.data.content_type == "link_web") {
      return (
        <i className={styles.lector__icon + " material-icons-outlined "}>
          public
        </i>
      );
    } else if (props.data.content_type == "link_pdf") {
      return (
        <i className={styles.lector__icon + " material-icons-outlined "}>
          &#xe415;
        </i>
      );
    } else if (props.data.content_type == "link_video") {
      return (
        <i className={styles.lector__icon + " material-icons-outlined "}>
          movie
        </i>
      );
    }
  }

  return (
    <div className={styles.content__container}>
      <a href={extra.linkURL}>
        <div className={styles.content__body + " " + styles.content__link}>
          <div>{getIcons()}</div>
          <p className={styles.content__text}>
            {props.data.content_textContent}
          </p>
          <a href={extra.linkURL} target="_blank">
            <i className={styles.lector__icon + " material-icons-outlined "}>
              &#xe89e;
            </i>
          </a>
        </div>
      </a>
    </div>
  );
}
