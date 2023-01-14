import WeekGridItem from "./weekGridItem";
import styles from "../../../styles/rooster.module.css";

export default function WeekGrid(props) {
  function modalPassthrough(arg) {
    props.modal(arg);
  }

  return (
    <ul className={styles.weekGrid__container}>
      <WeekGridItem
        day={1}
        ddl={props.ddl}
        les={props.les}
        koepel={props.koepel}
        modal={modalPassthrough}
      />
      <WeekGridItem
        day={2}
        ddl={props.ddl}
        les={props.les}
        koepel={props.koepel}
        modal={modalPassthrough}
      />
      <WeekGridItem
        day={3}
        ddl={props.ddl}
        les={props.les}
        koepel={props.koepel}
        modal={modalPassthrough}
      />
      <WeekGridItem
        day={4}
        ddl={props.ddl}
        les={props.les}
        koepel={props.koepel}
        modal={modalPassthrough}
      />
      <WeekGridItem
        day={5}
        ddl={props.ddl}
        les={props.les}
        koepel={props.koepel}
        modal={modalPassthrough}
      />
      <WeekGridItem
        day={6}
        ddl={props.ddl}
        les={props.les}
        koepel={props.koepel}
        modal={modalPassthrough}
      />
      <WeekGridItem
        day={0}
        ddl={props.ddl}
        les={props.les}
        koepel={props.koepel}
        modal={() => {
          modalPassthrough;
        }}
      />
    </ul>
  );
}
