import { useState, useEffect } from "react";
import styles from "../../../styles/editContent.module.css";

export default function EditContent(props) {
  const [formData, setFormData] = useState({});
  const [initial, setInitial] = useState({});

  const resetValues = () => {
    setFormData(initial);
  };

  const deleteItem = async () => {
    formData.table = "vak_content";
    const JSONLoginData = JSON.stringify(formData);
    console.log(formData);
    // do something with the parsed data
    const endpoint = "api/deleteTinyForm";
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

  const formSubmit = async (event) => {
    event.preventDefault();

    formData.table = "vak_content";
    const JSONLoginData = JSON.stringify(formData);
    console.log(formData);
    // do something with the parsed data
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
    window.location.reload();
  };

  useEffect(() => {
    const initialState = Object.keys(props.data).reduce((acc, key) => {
      acc[key] = props.data[key];
      return acc;
    }, {});
    setFormData(initialState);
    setInitial(initialState);
  }, [props.data]);

  const handleChange = (event, name) => {
    const { value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const fields = Object.keys(props.data).map((key) => {
    return {
      name: key,
      label: key,
      value: props.data[key],
    };
  });

  function editableFilter(item) {
    let notEditable = [
      "ID",
      "bundle_ID",
      "content_ID",
      "chronology",
      "timestamp",
      "content_type",
      "deadline_ID",
      "content_img_2",
    ];

    if (notEditable.find((noEdit) => noEdit == item.name)) {
      return;
    } else {
      return item;
    }
  }

  const submitButtonClass =
    JSON.stringify(formData) !== JSON.stringify(initial)
      ? styles.ec__changed
      : styles.ec__unChanged;

  return (
    <div className={styles.ec__bgCover}>
      <div className={styles.ec__container}>
        <h3 className={styles.ec__title}>Item bewerken</h3>
        <div className={styles.ec__content}>
          <form onSubmit={formSubmit}>
            {fields.filter(editableFilter).map((field) => (
              <div key={field.name} className={styles.ec__field}>
                <label htmlFor={field.name} className={styles.ec__label}>
                  {field.label}:
                </label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={(event) => handleChange(event, field.name)}
                  className={styles.ec__input}
                />
              </div>
            ))}
            <div className={styles.ec__buttons}>
              <button
                type="button"
                onClick={resetValues}
                className={styles.ec__reset}
              >
                <i
                  className={
                    "material-icons-outlined " +
                    styles.md24 +
                    " " +
                    styles.dragDrop__icon
                  }
                >
                  replay
                </i>
                Reset
              </button>
              <button type="button" className={styles.ec__delete}>
                <i
                  className={
                    "material-icons-outlined " +
                    styles.md24 +
                    " " +
                    styles.dragDrop__icon
                  }
                  onClick={() => {
                    deleteItem();
                  }}
                >
                  delete
                </i>
                Delete
              </button>
              <button
                type="submit"
                className={styles.ec__submit + " " + submitButtonClass}
              >
                <i
                  className={
                    "material-icons-outlined " +
                    styles.md24 +
                    " " +
                    styles.dragDrop__icon
                  }
                >
                  save
                </i>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
