import { useEffect, useState } from "react";
import { getWeekDay, addDays, getTxtMonth } from "../../helpers/time";

export default function AVLessen(props) {
  const [volgendeLes, setVolgendeLes] = useState("");

  let currentDate = new Date();

  function doen() {
    if (props.data) {
      function getDayDifference() {
        if (props.data[0].dotW - currentDate.getDay() < 0) {
          return props.data[0].dotW + 7 - currentDate.getDay();
        } else {
          return props.data[0].dotW - currentDate.getDay();
        }
      }

      console.log(props.data[0].dotW);
      console.log(getDayDifference());
      let dateResult = addDays(currentDate, getDayDifference());
      console.log(dateResult);
      dateResult.month = getTxtMonth(dateResult.getMonth());
      dateResult.date = dateResult.getDate();

      let plusWeek = addDays(dateResult, 7);
      let lesErna = {
        month: getTxtMonth(plusWeek.getMonth()),
        date: plusWeek.getDate(),
      };

      setVolgendeLes(
        <p>
          <p>Volgende les:</p>
          <span>{dateResult.date}</span>
          &ensp;
          <span>{dateResult.month}</span>
          <p>Les daarna:</p>
          <span>{lesErna.date}</span>
          &ensp;
          <span>{lesErna.month}</span>
        </p>
      );
    }
  }

  useEffect(() => {
    doen();
  }, [props.data]);

  return <p>{volgendeLes}</p>;
}
