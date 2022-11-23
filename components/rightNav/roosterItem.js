import styles from "../../styles/rooster_item.module.css";

export default function Rooster_item(props) {
  console.log(props.data);
  let vak = props.data;
  vak.hour_start = vak.hour_start.slice(0, 5);
  vak.hour_end = vak.hour_end.slice(0, 5);
  vak.autoStyle = {
    begin: vak.hour_start.slice(0, 2) - 5,
    end: vak.hour_end.slice(0, 2) - 5,
  };

  function checkOngoing() {
    let date = new Date();
    if (new Date(vak.hour_start) < date && new Date(vak.hour_end) > date) {
      return styles.item__ongoingClass;
    } else {
      return " ";
    }
  }

  return (
    <div
      className={
        vak.koepel_ID + " " + styles.rooster__block + " " + checkOngoing()
      }
      style={{
        gridArea:
          "1 / " + vak.autoStyle.begin + " / span 1 / " + vak.autoStyle.end,
      }}
    >
      <p className={styles.item__time_start}>{vak.hour_start}</p>
      <div className={styles.item__info}>
        <h3 className={styles.item__vakTitle}>{vak.vak_name}</h3>
        <p className={styles.item__location}>
          <span className={styles.item__campus}>{vak.vak_location_campus}</span>
          <span className={styles.item__room}>{vak.vak_location_room}</span>
        </p>
      </div>

      <p className={styles.item__time_end}>{vak.hour_end}</p>
    </div>
  );
}
