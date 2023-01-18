import { useEffect, useState } from "react";
import styles from "../../styles/Tools.module.css";

export default function InfoBlock(props) {
  const [contactContent, setContactContent] = useState("");

  function renderContacts() {
    let contacts = JSON.parse(props.contact.content_textContent);

    console.log(contacts);

    setContactContent(
      contacts.contact.map((item, i) => {
        return (
          <div className={styles.block__person} key={i}>
            <div className={styles.block__hover}>
              <span className={styles.block__email}>
                <i className={"material-icons-outlined " + styles.md24}>copy</i>
                <span>{item.email}</span>
              </span>
              <span className={styles.block__name}>
                <i className={"material-icons-outlined " + styles.md24}>
                  person
                </i>
                <span>{item.name}</span>
              </span>
            </div>
          </div>
        );
      })
    );
  }

  useEffect(() => {
    if (props.contact) {
      renderContacts();
    }
  }, [props.contact]);

  return (
    <section className={styles.block__container}>
      <h3 className={styles.block__title}>{props.title.content_textContent}</h3>
      <div className={styles.block__content}>
        <img
          className={styles.block__img}
          src={props.img.content_textContent}
        />
        <div className={styles.block__info}>
          <span>Meer info</span>
          <i className={"material-icons-outlined " + styles.md24}>launch</i>
        </div>
        <div className={styles.block__text}>
          {props.text.content_textContent}
        </div>
        <div className={styles.block__contact}>{contactContent}</div>
      </div>
    </section>
  );
}
