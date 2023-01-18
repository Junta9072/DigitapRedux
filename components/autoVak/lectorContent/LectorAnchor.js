import { useState } from "react";
import styles from "../../../styles/vakContent.module.css";
import EditContent from "./editContent";

export default function ContentAnchor(props) {
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
    <>
      <div
        className={styles.content__container}
        onClick={() => {
          toggleEdit();
        }}
      >
        <a>
          <div className={styles.content__body + " " + styles.content__link}>
            <div>{getIcons()}</div>
            <p className={styles.content__text}>
              {props.data.content_textContent}
            </p>
            <a>
              <i className={styles.lector__icon + " material-icons-outlined "}>
                &#xe89e;
              </i>
            </a>
          </div>
        </a>
      </div>
      {editModal}
    </>
  );
}
