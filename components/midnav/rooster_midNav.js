import { useEffect, useState } from "react";
import styles from "../../styles/MidNav.module.css";

import TrajectRoosterTabs from "../midNav_Rooster/trajectRoosterTabs";

export default function Rooster_MidNav(props) {
  const [roosterMenuContent, setRoosterMenuContent] = useState("");
  const [activeOption, setActiveOption] = useState(0);

  function changeActiveVak(arg) {
    console.log("upward! MN" + arg);
    props.setRightNav(arg);
  }

  let roosterData = {
    trajecten: [
      { traject_name: "3GDM IDL-CEC", traject_ID: 1 },
      { traject_name: "2GDM IDL", traject_ID: 2 },
    ],
  };

  function roosterMenu() {
    setRoosterMenuContent(
      roosterData.trajecten.map((traject) => {
        return (
          <TrajectRoosterTabs
            data={traject}
            activeVak={props.activeVak}
            changeActiveVak={changeActiveVak}
          />
        );
      })
    );
  }

  useEffect(() => {
    roosterMenu();
  }, [props.activeVak]);

  //<i className={"material-icons-outlined " + styles.md24}>&#xe916;</i>
  return (
    <>
      <ul>{roosterMenuContent}</ul>
    </>
  );
}
