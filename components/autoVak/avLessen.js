import { useEffect, useState } from "react";
import { getWeekDay, addDays, getTxtMonth } from "../../helpers/time";
import styles from "../../styles/AutoVak.module.css";
import AutoVak from "./autoVak";
import AVLes from "./AVLes";

export default function AVLessen(props) {
  const [volgendeLes, setVolgendeLes] = useState("");

  let currentDate = new Date();

  function generateLessen() {
    if (props.data) {
      function getDayDifference() {
        if (props.data[0].dotW - currentDate.getDay() < 0) {
          //als les nog niet heeft plaatsgevonden deze week
          return props.data[0].dotW + 7 - currentDate.getDay();
        } else {
          //als de les al is geweest deze week
          return props.data[0].dotW - currentDate.getDay();
        }
      }

      console.log(props.data[0].dotW);
      console.log(getDayDifference());

      //tel het aantal dagen tussen nu en de volgende les op
      //dit vormt een nieuwe Date()
      let dateResult = addDays(currentDate, getDayDifference());
      console.log(dateResult);
      dateResult.month = getTxtMonth(dateResult.getMonth());
      dateResult.date = dateResult.getDate();

      //LesData voor de tweede les van dit vak
      //tel 7 dageon op bij de vorige les en genereer een nieuwe Date()
      let plusWeek = addDays(dateResult, 7);
      let lesErna = {
        month: getTxtMonth(plusWeek.getMonth()),
        date: plusWeek.getDate(),
      };

      setVolgendeLes(
        <p>
          <p className={styles.upcoming__title}>Volgende les:</p>
          <AVLes data={dateResult} location={props.data[0]} />
          <AVLes data={lesErna} location={props.data[0]} />
        </p>
      );
    }
  }

  useEffect(() => {
    generateLessen();
  }, [props.data]);

  return <p>{volgendeLes}</p>;
}
