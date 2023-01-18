import { useState } from "react";
import styles from "../../../styles/vakContent.module.css";
import EditContent from "./editContent";

export default function ContentGroup(props) {
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
      <div className={styles.content__container}>
        <h3
          className={styles.content__title}
          onClick={() => {
            toggleEdit();
          }}
        >
          {props.data.content_title}
        </h3>
        <div className={styles.content__body + " " + styles.content__group}>
          {props.children}
        </div>
      </div>
      {editModal}
    </>
  );
}
