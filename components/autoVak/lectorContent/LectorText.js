import styles from "../../../styles/vakContent.module.css";
import { parseMarkdown } from "../../../helpers/mdParser";
import { useState, useEffect } from "react";
import TinyDeadline from "../tinyDeadline";
import EditContent from "./editContent";

export default function ContentText(props) {
  const [htmlReturn, setHtmlReturn] = useState("");
  const [textTitle, setTextTitle] = useState("");
  const [deadlineAppend, setDeadlineAppend] = useState("");
  const [hideText, setHideText] = useState("");
  const [containerCSS, setContainerCSS] = useState("");

  const [editVis, setEditVis] = useState(false);
  const [editModal, setEditModal] = useState("");

  function toggleEdit() {
    if (editVis == false) {
      setEditVis(true);
      setEditModal(<EditContent data={props.data} close={toggleEdit} />);
    } else {
      setEditVis(false);
      setEditModal("");
    }
  }

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

    if (props.data.deadline_ID == -1) {
    } else {
      console.log("deadline gevonden");
      setHideText(["0px", "none"]);
      setDeadlineAppend(<TinyDeadline id={props.data.deadline_ID} />);
    }
  }, [props.data, containerCSS]);

  return (
    <>
      <div
        className={styles.content__container}
        onClick={() => {
          toggleEdit();
        }}
      >
        {textTitle}
        <div className={styles.content__body}>
          <p
            className={styles.content__text}
            style={{ minHeight: hideText[0], display: hideText[1] }}
          >
            <div dangerouslySetInnerHTML={getMDContent()}></div>
          </p>
          {deadlineAppend}
        </div>
      </div>
      {editModal}
    </>
  );
}
