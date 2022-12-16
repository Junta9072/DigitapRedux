import styles from "../../styles/vakContent.module.css";
import { parseMarkdown } from "../../helpers/mdParser";
import { useState, useEffect } from "react";

export default function ContentText(props) {
  const [htmlReturn, setHtmlReturn] = useState("");

  function getMDContent() {
    return { __html: htmlReturn };
  }

  useEffect(() => {
    const parser = new DOMParser();
    setHtmlReturn(parseMarkdown(props.data.content_textContent));
  }, []);

  return (
    <div className={styles.content__container}>
      <h3 className={styles.content__title}>{props.data.content_title}</h3>
      <div className={styles.content__body}>
        <p className={styles.content__text}>
          <div dangerouslySetInnerHTML={getMDContent()}></div>
        </p>
      </div>
    </div>
  );
}
