import styles from "../../../styles/vakContent.module.css";
import { useState } from "react";
import EditContent from "./editContent";

export default function ContentMessageBoard(props) {
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

  return (
    <>
      <div
        className={styles.content__container}
        onClick={() => {
          toggleEdit();
        }}
      >
        <div className={styles.content__body}>
          <p className={styles.content__text}>
            {props.data.content_textContent}
          </p>
        </div>
      </div>
      {editModal}
    </>
  );
}
