import WeekGridItem from "./weekGridItem";
import styles from "../../../styles/rooster.module.css";

export default function WeekGrid() {
  return (
    <ul className={styles.weekGrid__container}>
      <WeekGridItem day={1} />
      <WeekGridItem day={2} />
      <WeekGridItem day={3} />
      <WeekGridItem day={4} />
      <WeekGridItem day={5} />
      <WeekGridItem day={6} />
      <WeekGridItem day={0} />
    </ul>
  );
}
