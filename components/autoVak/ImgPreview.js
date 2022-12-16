import { useState, useEffect } from "react";
import styles from "../../styles/imgPreview.module.css";

export default function ImgPreview(props) {
  const [imgPreviewToggle, setImgPreviewToggle] = useState(false);
  const [imgPreviewSrc, setImgPreviewSrc] = useState("");
  const [imgPreviewStyle, setImgPreviewStyle] = useState("");

  function closePreview() {
    setImgPreviewToggle(false);
    setImgPreviewSrc("");
    setImgPreviewStyle("");
  }

  useEffect(() => {
    if (props.toggle == true) {
      setImgPreviewToggle(true);
      setImgPreviewStyle(styles.content__imagePreview__active);
    }
    setImgPreviewSrc(props.src);
  }, [props]);

  return (
    <div
      className={styles.content__imagePreview + " " + imgPreviewStyle}
      onClick={() => {
        closePreview();
        props.toggleFeedback();
      }}
    >
      <img src={imgPreviewSrc} className={styles.imagePreview__img} />
      <p
        onClick={() => {
          closePreview();
          props.toggleFeedback();
        }}
      >
        <span>close</span>
        <i
          className={
            " material-icons-outlined " + styles.content__imagePreview__close
          }
        >
          close
        </i>
      </p>
    </div>
  );
}
