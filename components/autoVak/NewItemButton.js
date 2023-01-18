import { useEffect, useState } from "react";
import styles from "../../styles/editContent.module.css";
import DdlModal from "./lectorContent/ddlModal";

export default function NewItemButton(props) {
  const [nibMenu, setNibMenu] = useState(false);
  const [nibContent, setNibContent] = useState("");

  const [modalVis, setModalVis] = useState(false);
  const [modalContent, setModalContent] = useState(true);

  let data = {};

  function deadlineModal() {
    //toggleVis van de modal
    if (modalVis == false) {
      setModalVis(true);
      setModalContent(<DdlModal count={props.count} />);
    } else {
      setModalVis(false);
      setModalContent("");
    }
    //modal onsubmit Createdeadline() triggeren
    //--> gaat door in het component
  }

  const createItem = async (arg) => {
    data.count = props.count;
    data.table = "vak_content";
    data.type = arg;
    const JSONLoginData = JSON.stringify(data);
    // do something with the parsed data
    const endpoint = "api/insertTinyForm";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "applications/json",
      },
      body: JSONLoginData,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(result);
    window.location.reload();
  };

  useEffect(() => {
    data.count = props.count;
    console.log(props.count);
  }, [props.count]);

  function toggleMenu() {
    if (nibMenu == false) {
      setNibMenu(true);
      setNibContent(
        <div className={styles.nib__bgCover}>
          <div className={styles.nib__container}>
            <div className={styles.nib__header}>
              <h3 className={styles.nib__title}>Nieuw item maken</h3>
              <p>{props.count}</p>
              <div
                className={styles.nib__title}
                onClick={() => {
                  setNibMenu(false);
                  setNibContent("");
                }}
              >
                close X
              </div>
            </div>

            <div className={styles.nib__content}>
              <div className={styles.nib__buttons}>
                <button
                  onClick={() => {
                    createItem("msgboard");
                  }}
                >
                  msgboard
                </button>
                <button
                  onClick={() => {
                    createItem("group");
                  }}
                >
                  group
                </button>
                <button
                  onClick={() => {
                    createItem("text");
                  }}
                >
                  text
                </button>
                <button
                  onClick={() => {
                    createItem("text_img");
                  }}
                >
                  text_img
                </button>
                <button
                  onClick={() => {
                    createItem("link_pdf");
                  }}
                >
                  link_pdf
                </button>
                <button
                  onClick={() => {
                    deadlineModal();
                  }}
                >
                  deadline
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      setNibMenu(false);
      setNibContent("");
    }
  }

  return (
    <>
      <button
        className={styles.nib}
        onClick={() => {
          toggleMenu();
        }}
      >
        Nieuw item +
      </button>
      {nibContent}
      {modalContent}
    </>
  );
}
