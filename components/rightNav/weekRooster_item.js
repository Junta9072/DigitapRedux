import styles from "../../styles/rooster_item.module.css";

export default function WeekRooster_item(props) {
  let vak = props.data;
  console.log(vak);
  vak.hour_start = vak.hour_start.slice(0, 5);
  vak.hour_end = vak.hour_end.slice(0, 5);
  vak.autoStyle = {
    begin: vak.hour_start.slice(0, 2) - 5,
    end: vak.hour_end.slice(0, 2) - 5,
  };

  function checkOngoing() {
    let date = new Date();
    if (
      vak.hour_start.slice(0, 2) < date.getHours() &&
      vak.hour_end.slice(0, 2) > date.getHours()
    ) {
      return styles.item__ongoingClass;
    } else {
      return " ";
    }
  }

  return (
    <div
      className={styles.week__block + " " + checkOngoing()}
      style={{
        gridArea:
          vak.autoStyle.begin +
          " / " +
          vak.dotW +
          " /" +
          vak.autoStyle.end +
          "/ span 1 ",
      }}
      onClick={() => props.navigate(vak.koepel_ID)}
    >
      <div className={styles.week__info}>
        <h3 className={styles.week__title}>{vak.vak_name}</h3>
        <p className={styles.week__location}>
          {vak.vak_location_campus + vak.vak_location_room}
        </p>
      </div>
      <div className={styles.week__time}>
        <p>{vak.hour_start}</p>
        <p>{vak.hour_end}</p>
      </div>
    </div>
  );
}
