import { useEffect, useState } from "react";
import styles from "../../../styles/rooster.module.css";

export default function MonthGridItem(props) {
  const [gridCalc, setGridCalc] = useState("");

  let date = new Date();

  function checkOngoing() {
    if (props.day == date.getDate()) {
      return styles.month__itemActive;
    } else {
      return "";
    }
  }

  function getGridPos() {
    let row = Math.ceil((props.day + props.spacer) / 7);
    let col = props.day - (row - 1) * 7 + props.spacer;
    console.log(
      "i = " + props.day + " so row is " + row + " and col is " + col
    );
    setGridCalc("" + row + " / " + col + " / span 1 / span 1");
  }

  useEffect(() => {
    getGridPos();
    console.log(props.spacer);
  }, [props.spacer]);

  return (
    <div
      className={styles.month__item + " " + checkOngoing()}
      style={{ gridArea: gridCalc }}
    >
      <div className={styles.month__itemDate}> {props.day}</div>
      {/* Hier de shit van die dag ophalen */}
    </div>
  );
}
