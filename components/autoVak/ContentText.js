import styles from "../../styles/vakContent.module.css";
import { parseMarkdown } from "../../helpers/mdParser";
import { useState, useEffect } from "react";

export default function ContentText(props) {
  const [htmlReturn, setHtmlReturn] = useState("");
  const [textTitle, setTextTitle] = useState("");

  function getMDContent() {
    return { __html: htmlReturn };
  }

  useEffect(() => {
    const parser = new DOMParser();
    setHtmlReturn(parseMarkdown(props.data.content_textContent));
    if (props.data.content_title.length != 0) {
      setTextTitle(
        <h3 className={styles.content__title}>{props.data.content_title}</h3>
      );
    } else {
      setTextTitle("");
    }
  }, [props.data]);

  return (
    <div className={styles.content__container}>
      {textTitle}
      <div className={styles.content__body}>
        <p className={styles.content__text}>
          <div dangerouslySetInnerHTML={getMDContent()}></div>
        </p>
      </div>
    </div>
  );
}
