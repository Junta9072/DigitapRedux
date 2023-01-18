import { useState, useEffect } from "react";
import styles from "../../../styles/vakContent.module.css";

export default function TinyForm(props) {
  const [button, setButton] = useState("edit");
  const [extraButton, setExtraButton] = useState("");
  const [buttonType, setButtonType] = useState("");

  const [saveContent, setSaveContent] = useState("");
  const [formValue, setFormValue] = useState("");
  const [editControl, setEditControl] = useState(true);

  function editContent() {
    //check current state
    if (button == "edit") {
      //save content
      setSaveContent(props.children);
      setEditControl(false);
      setButton("cancel");
      setExtraButton(
        <i
          className={
            "material-icons-outlined " +
            styles.md24 +
            " " +
            styles.dragDrop__icon
          }
        >
          delete
        </i>
      );

      props.css(styles.tinyForm__margin + " " + styles.tinyForm__active);
      console.log(props.children);
      //check save == current

      //decide button icon
    } else if (button == "cancel") {
      setEditControl(true);
      setButton("edit");
      setExtraButton("");
      props.css(styles.tinyForm__margin);
    } else if (button == "save") {
      //form fields ophalen
      //API call
      console.log("SAVE new string");
      props.css(styles.tinyForm__margin);
    }
  }

  function checkChanges(arg) {
    if (arg == saveContent) {
      console.log("nothing changed");
      setButton("cancel");
      setExtraButton(
        <i
          onClick={() => {
            console.log("DELETE current block");
          }}
          className={
            "material-icons-outlined " +
            styles.md24 +
            " " +
            styles.dragDrop__icon
          }
        >
          delete
        </i>
      );
    } else {
      console.log("something changed");
      setButton("save");
      setButtonType("submit");
      setExtraButton(
        <i
          onClick={() => {
            setFormValue(saveContent);
            setButton("cancel");
            setExtraButton(
              <i
                onClick={() => {
                  console.log("DELETE current block");
                }}
                className={
                  "material-icons-outlined " +
                  styles.md24 +
                  " " +
                  styles.dragDrop__icon
                }
              >
                delete
              </i>
            );
          }}
          className={
            "material-icons-outlined " +
            styles.md24 +
            " " +
            styles.dragDrop__icon
          }
        >
          replay
        </i>
      );
    }
  }

  const tinyFormSubmit = async (event) => {
    event.preventDefault();
    console.log(event);
    const formData = {
      formTable: "vak_content",
      formName: props.element,
      formValue: event.target.tinyText.value,
      formID: props.data.ID,
    };
    const JSONLoginData = JSON.stringify(formData);

    const endpoint = "api/setTinyForm";
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
  };

  useEffect(() => {}, [button]);

  useEffect(() => {
    setFormValue(props.children);
    props.css(styles.tinyForm__margin);
  }, []);

  return (
    <>
      <form onSubmit={tinyFormSubmit} className={styles.tinyForm}>
        <input
          className={styles.tinyForm__input}
          name="tinyText"
          type="text"
          value={formValue}
          onChange={(e) => {
            checkChanges(event.target.value);
            setFormValue(event.target.value);
          }}
          readOnly={editControl}
        ></input>

        <div className={styles.tinyForm__button}>
          <button
            className={styles.tinyForm__edit}
            type={buttonType}
            onClick={() => {
              editContent();
            }}
          >
            <i
              className={
                "material-icons-outlined " +
                styles.md24 +
                " " +
                styles.dragDrop__icon
              }
            >
              {button}
            </i>
          </button>
        </div>
        {extraButton}
      </form>
    </>
  );
}
