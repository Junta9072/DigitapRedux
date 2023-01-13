import { useEffect, useState } from "react";
import styles from "../../../styles/rooster.module.css";

export default function MonthGridItem(props) {
  const [gridCalc, setGridCalc] = useState("");
  const [lesItemContent, setLesItemContent] = useState("skibidibapmmdada");
  const [ddlItemContent, setDdlItemContent] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [staticFilter, setStaticFilter] = useState("");

  let date = new Date();

  function checkOngoing() {
    if (props.day == date.getDate()) {
      return styles.month__itemActive;
    } else {
      return "";
    }
  }

  let row = "";
  let col = "";

  function getGridPos() {
    row = Math.ceil((props.day + props.spacer) / 7);
    col = props.day - (row - 1) * 7 + props.spacer;
    setGridCalc("" + row + " / " + col + " / span 1 / span 1");
    setWeekDay(col);
  }

  let lesAssembly = "";
  let knip = false;
  let lesFilter = "";
  let ddlFilter = "";
  function generateContent() {
    lesFilter = props.les.filter((les) => les.dotW == col);
    ddlFilter = props.ddl.filter(
      (ddl) => new Date(ddl.deadline_date).getDate() == props.day
    );

    setStaticFilter({ les: lesFilter, ddl: ddlFilter });

    if (lesFilter.length + ddlFilter.length > 4) {
      knip = true;
    }

    setLesItemContent(
      lesFilter.map((les, i) => {
        if (i == 1 && lesFilter.length > 2 && knip == true) {
          return <p>{lesFilter.length - 2 + " more"}</p>;
        } else if (knip == true && i > 2) {
          return;
        } else {
          return <p className={styles.rooster__lesItem}>{les.vak_name}</p>;
        }
      })
    );
    console.log(lesAssembly);
    setDdlItemContent(
      ddlFilter.map((ddl, i) => {
        if (i == 1 && lesFilter.length > 2 && knip == true) {
          return <p>{lesFilter.length - 2 + " more"}</p>;
        } else if (knip == true && i > 2) {
          return;
        } else {
          return <p className={styles.rooster__ddlItem}>{ddl.deadline_name}</p>;
        }
      })
    );
  }

  useEffect(() => {
    getGridPos();
    console.log(props.spacer);
  }, [props.spacer]);

  useEffect(() => {
    console.log(props.les);
    if (!props.les || !props.ddl) {
    } else {
      getGridPos();
      generateContent();
    }
  }, [props.les, props.ddl]);

  return (
    <div
      className={styles.month__item + " " + checkOngoing()}
      style={{ gridArea: gridCalc }}
      onClick={() => {
        props.modal(props.day);
      }}
    >
      <div className={styles.month__itemDate}> {props.day}</div>
      {/* Hier de shit van die dag ophalen */}
      <div>{lesItemContent}</div>
      <div>{ddlItemContent}</div>
    </div>
  );
}
