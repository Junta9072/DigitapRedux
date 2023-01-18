import { useState, useRef, useEffect } from "react";
import styles from "../../styles/AutoVak.module.css";

export default function FileDropZone(props) {
  /* dag wim, iets zegt me dat je hier misschien wel eens komt kijken.
de file upload is zo goed als nep zoals je kan lezen, maar ik vond het nep doen cool genoeg
en het echt doen lastig genoeg. dus ja */
  const [files, setFiles] = useState([]);
  const [commitButton, setCommitButton] = useState("");
  const fileInputRef = useRef();

  const [uploadZone, setUploadZone] = useState("");
  const [commitToggle, setCommitToggle] = useState(false);

  function fileAccess(arg) {
    console.log(arg);
    if (arg == true) {
      //files zijn open
      setCommitToggle(true);
      setUploadZone(styles.dragDrop__Active);
      setCommitButton(
        <h3
          className={styles.dragDrop__commit}
          onClick={() => {
            console.log(commitToggle);
            indienen();
          }}
        >
          Bewaar veranderingen
        </h3>
      );
    } else {
      setUploadZone(styles.dragDrop__locked);
      setCommitButton(
        <h3
          className={styles.dragDrop__commit}
          onClick={() => {
            toggleCommit();
          }}
        >
          Bewerk inzendingen
        </h3>
      );
    }
  }

  function toggleCommit() {
    if (commitToggle == false) {
      setCommitToggle(true);
    } else {
      setCommitToggle(false);
    }
  }

  function uploadCheck() {
    if (localStorage.getItem("ddl")) {
      let storedDdl = JSON.parse(localStorage.getItem("ddl"));
      console.log(storedDdl);
      if (storedDdl.id == props.id) {
        setCommitToggle(false);
        setFiles(storedDdl.files);
      } else {
        setUploadZone(styles.dragDrop__Active);
      }
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    setFiles([...files, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const openFileExplorer = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (file) => {
    setFiles(files.filter((f) => f !== file));
  };

  function getIcon(arg) {
    console.log(arg);
    let type = arg.split("/")[1];
    console.log(type);
    if (type == "jpeg" || type == "png") {
      return "image";
    } else if (type == "zip") {
      return "folder_zip";
    } else if (type == "pdf") {
      return "picture_as_pdf";
    } else if (type == "mpeg") {
      return "audiotrack";
    } else if (type == "mp4") {
      return "movie";
    } else if (type == "plain") {
      return "text_fields";
    } else {
      return "description";
    }
  }

  function fancyName(name) {
    let temp = name.split(".");
    return (
      <>
        <span className={styles.dragDrop__fileTinyName}>{temp[0]}</span>
        <span className={styles.dragDrop__fileExt}>.{temp[1]}</span>
      </>
    );
  }

  function indienen() {
    let fileNames = [];
    files.forEach((item, i) => {
      fileNames.push({ name: item.name, size: item.size, type: item.type });
    });
    let stringData = JSON.stringify({ id: props.id, files: fileNames });
    localStorage.setItem("ddl", stringData);
    setTimeout(() => {
      console.log(commitToggle);
      //closeIndienMap
      toggleCommit(); //
    }, 500);
  }

  useEffect(() => {
    uploadCheck();
  }, []);

  useEffect(() => {
    if (files.length != 0) {
      if (uploadZone != styles.dragDrop__locked) {
        setCommitButton(
          <h3
            className={styles.dragDrop__commit}
            onClick={() => {
              console.log(commitToggle);
              indienen();
            }}
          >
            Bewaar veranderingen
          </h3>
        );
      }
    } else {
      setCommitButton("");
    }
  }, [files, uploadZone]);

  useEffect(() => {
    fileAccess(commitToggle);
  }, [commitToggle]);

  return (
    <div className={styles.dragDrop__container}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={styles.dragDrop__parking}
      >
        <i
          className={
            "material-icons-outlined " +
            styles.md24 +
            " " +
            styles.dragDrop__icon
          }
        >
          file_upload
        </i>
        <p className={styles.dragDrop__text}>
          Sleep je bestanden hier in <br /> of klik&ensp;
          <span
            className={styles.dragDrop__fileOpen}
            onClick={openFileExplorer}
            style={{ cursor: "pointer" }}
          >
            hier
          </span>
          &ensp;om er te zoeken.
        </p>
      </div>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </div>
      <ul className={styles.dragDrop__queue + " " + uploadZone}>
        {files.map((file) => (
          <li key={file.name} className={styles.dragDrop__queueItem}>
            <span className={styles.dragDrop__fileIcon}>
              <i className={"material-icons-outlined " + styles.md24}>
                {getIcon(file.type)}
              </i>
            </span>
            <span className={styles.dragDrop__fileName}>
              {fancyName(file.name)}
            </span>
            <span className={styles.dragDrop__fileSize}>
              {(file.size / 1048576).toFixed(2)} MB
            </span>
            <span
              className={styles.dragDrop__fileRemove}
              onClick={() => {
                removeFile(file);
              }}
            >
              X
            </span>
          </li>
        ))}
        {commitButton}
      </ul>
    </div>
  );
}
