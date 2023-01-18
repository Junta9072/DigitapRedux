import styles from "../../../styles/vakContent.module.css";

import { useRef, useEffect, useState } from "react";
import EditContent from "./editContent";

import { parseMarkdown } from "../../../helpers/mdParser";
import ImgPreview from "../ImgPreview";

export default function ContentTextImg(props) {
  const [imgPreviewToggle, setImgPreviewToggle] = useState(false);
  const [imgPreviewSrc, setImgPreviewSrc] = useState("");
  const imageRef = useRef();
  const [textTitle, setTextTitle] = useState("");

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

    if (props.data.content_title.length != 0) {
      setTextTitle(
        <h3 className={styles.content__title}>{props.data.content_title}</h3>
      );
    } else {
      setTextTitle("");
    }
  }, []);

  const [htmlReturn, setHtmlReturn] = useState("");

  function getMDContent() {
    return { __html: htmlReturn };
  }

  useEffect(() => {
    const parser = new DOMParser();
    setHtmlReturn(parseMarkdown(props.data.content_textContent));
  }, []);

  return (
    <>
      <div
        className={styles.content__container}
        onClick={() => {
          toggleEdit();
        }}
      >
        {textTitle}
        <div
          className={styles.content__body + " " + styles.content__body__textImg}
        >
          <p
            className={styles.content__text}
            dangerouslySetInnerHTML={getMDContent()}
          ></p>
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
      {editModal}
    </>
  );
}
