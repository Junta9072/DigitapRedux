import styles from "../../styles/vakContent.module.css";

import { useRef, useEffect, useState } from "react";

import ImgPreview from "./ImgPreview";

export default function ContentTextImg(props) {
  const [imgPreviewToggle, setImgPreviewToggle] = useState(false);
  const [imgPreviewSrc, setImgPreviewSrc] = useState("");
  const imageRef = useRef();

  function previewImage(ref) {
    console.log(ref.style.backgroundImage);
    let assembly = ref.style.backgroundImage.slice(
      5,
      ref.style.backgroundImage.length - 2
    );
    setImgPreviewSrc(assembly);
    setImgPreviewToggle(true);
  }

  function closePreview() {
    setImgPreviewSrc("");
    setImgPreviewToggle(false);
  }

  useEffect(() => {
    imageRef.current.addEventListener("click", function () {
      previewImage(imageRef.current);
    });
  }, []);

  return (
    <div className={styles.content__container}>
      <h3 className={styles.content__title}>{props.data.content_title}</h3>
      <div
        className={styles.content__body + " " + styles.content__body__textImg}
      >
        <p className={styles.content__text}>{props.data.content_textContent}</p>
        <div
          className={styles.content__img}
          style={{ backgroundImage: "url(" + props.data.content_img_1 + ")" }}
          ref={imageRef}
        ></div>
      </div>

      {/* IMAGE PREVIEW */}
      <ImgPreview
        toggle={imgPreviewToggle}
        src={imgPreviewSrc}
        toggleFeedback={closePreview}
      />
    </div>
  );
}
