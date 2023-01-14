import styles from "../../../styles/rooster.module.css";
import { getTxtMonth, getWeekDay } from "../../../helpers/time";
import { useEffect, useState } from "react";

export default function RoosterModal(props) {
  const [lesDetails, setLesDetails] = useState("");
  const [ddlDetails, setDdlDetails] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [parsedDate, setParsedDate] = useState("");
  const [ddlVak, setDdlVak] = useState("");

  let date = new Date();

  function getVis() {
    if (props.vis == false) {
      return styles.modal__off;
    } else {
      return styles.modal__on;
    }
  }

  useEffect(() => {
    if (props.data.les) {
      if (props.data.les.length == 0) {
        setLesDetails(
          <p className={styles.modal__geenLes}>geen geplande lessen</p>
        );
      } else {
        setLesDetails(
          props.data.les.map((les) => {
            les.hour_start = les.hour_start.slice(0, 2);
            les.hour_end = les.hour_end.slice(0, 2);
            return (
              <p className={styles.modal__les}>
                <span>{les.vak_name}</span>
                &ensp;
                <span className={styles.modal__hour}>
                  {les.hour_start}h -{les.hour_end}h
                </span>
              </p>
            );
          })
        );
      }
    }

    function getDdlTime(value) {
      if (value < 10) {
        return "0" + value;
      } else {
        return value;
      }
    }

    function getKoepelMatch(id) {
      return props.koepel.find((koepel) => koepel.koepel_ID == id).vak_name;
    }

    if (props.data.ddl) {
      if (props.data.ddl.length == 0) {
        setDdlDetails(<p className={styles.modal__geenLes}>geen deadlines</p>);
      } else {
        setDdlDetails(
          props.data.ddl.map((ddl) => {
            console.log(props.data.koepel);

            let dDate = new Date(ddl.deadline_date);
            return (
              <div className={styles.modal__ddl}>
                <p className={styles.modal__ddlVak}>
                  {getKoepelMatch(ddl.koepel_ID)}
                </p>
                <p className={styles.modal__ddlName}>{ddl.deadline_name}</p>
                <p className={styles.modal__ddlTime}>
                  {getDdlTime(dDate.getHours()) +
                    "h" +
                    getDdlTime(dDate.getMinutes())}
                </p>
                <div
                  className={styles.modal__ddlButton}
                  onClick={() => {
                    props.navigate(ddl.koepel_ID, 1);
                  }}
                >
                  <i className={"material-icons-outlined " + styles.md24}>
                    open_in_new
                  </i>
                </div>
              </div>
            );
          })
        );
      }
    }

    let tempDotW = new Date(
      date.getFullYear(),
      date.getMonth(),
      props.data.date
    );
    setModalTitle(
      getWeekDay(tempDotW.getDay()) +
        " " +
        tempDotW.getDate() +
        " " +
        getTxtMonth(tempDotW.getMonth())
    );
  }, [props.koepel, props.data]);

  return (
    <div className={styles.modal__clickCover + " " + getVis()}>
      <div className={styles.modal}>
        <div
          className={styles.modal__close}
          onClick={() => {
            props.modal();
          }}
        >
          X
        </div>
        <div className={styles.modal__main}>
          <div className={styles.modal__title}>
            <h3 className={styles.modal__date}>{modalTitle}</h3>
          </div>
          <div>
            <h4 className={styles.modal__subtitle}>Lessen:</h4>
            <ul className={styles.modal__list}>{lesDetails}</ul>
          </div>
          <div>
            <h4 className={styles.modal__subtitle}>Deadlines:</h4>
            <ul>{ddlDetails}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}
