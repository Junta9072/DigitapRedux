import styles from "../../../styles/editContent.module.css";
import { useState } from "react";

export default function DdlModal(props) {
  const createDeadline = async (event) => {
    event.preventDefault();
    const formData = {
      deadlineName,
      deadlineDate,
      koepelID,
      deadlineDesc,
      deadlineFileType,
      deadlineFilename,
      table: "deadlines",
      count: props.count,
    };
    console.log(formData);
    const JSONLoginData = JSON.stringify(formData);

    const endpoint = "api/insertDeadline";
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

  const [deadlineName, setDeadlineName] = useState("");
  const [deadlineDate, setDeadlineDate] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [koepelID, setKoepelID] = useState("");
  const [deadlineDesc, setDeadlineDesc] = useState("");
  const [deadlineFileType, setDeadlineFileType] = useState("");
  const [deadlineFilename, setDeadlineFilename] = useState("");

  return (
    <div className={styles.dm__bgCover}>
      <div className={styles.dm__container}>
        <h3 className={styles.dm__title}>Deadline maken</h3>
        <div className={styles.dm__content}>
          <form onSubmit={createDeadline} className={styles.dm__form}>
            <div className={styles.dm__field}>
              <label className={styles.dm__label}>Deadline Name:</label>
              <input
                className={styles.dm__input}
                type="text"
                value={deadlineName}
                onChange={(event) => setDeadlineName(event.target.value)}
              />
            </div>

            <div className={styles.dm__field}>
              <label className={styles.dm__label}>Deadline Date:</label>
              <input
                className={styles.dm__input}
                type="datetime-local"
                value={deadlineDate}
                onChange={(event) => setDeadlineDate(event.target.value)}
              />
            </div>

            <div className={styles.dm__field}>
              <label className={styles.dm__label}>Koepel ID:</label>
              <input
                className={styles.dm__input}
                type="text"
                value={koepelID}
                onChange={(event) => setKoepelID(event.target.value)}
              />
            </div>

            <div className={styles.dm__field}>
              <label className={styles.dm__label}>Deadline Description:</label>
              <textarea
                className={styles.dm__input}
                value={deadlineDesc}
                onChange={(event) => setDeadlineDesc(event.target.value)}
              />
            </div>

            <div className={styles.dm__field}>
              <label className={styles.dm__label}>Deadline File Type:</label>
              <select
                className={styles.dm__input}
                value={deadlineFileType}
                onChange={(event) => setDeadlineFileType(event.target.value)}
              >
                <option value="text">Text</option>
                <option value="file_pdf">File (PDF)</option>
                <option value="file_mp4">File (MP4)</option>
                <option value="file_zip">File (ZIP)</option>
              </select>
            </div>

            <div className={styles.dm__field}>
              <label className={styles.dm__label}>Deadline Filename:</label>
              <input
                className={styles.dm__input}
                type="text"
                value={deadlineFilename}
                onChange={(event) => setDeadlineFilename(event.target.value)}
              />
            </div>

            <input className={styles.dm__submit} type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
