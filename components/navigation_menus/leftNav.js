import MidNav from "./midNav.js";
import LeftNav__item from "../leftnav/leftNav__item";

import { useEffect, useState } from "react";
import styles from "../../styles/LeftNav.module.css";
import midStyles from "../../styles/MidNav.module.css";
import LeftNav__collapse from "../leftnav/leftNav__collapse.js";

export default function LeftNav() {
  const [activeContent, setActiveContent] = useState(0);
  const [collapseToggle, setCollapseToggle] = useState(false);

  function checkActiveContent(nummer) {
    if (nummer == activeContent) {
      return styles.active;
    } else {
      return;
    }
  }

  const changeActive = (num) => {
    setActiveContent(num);
  };

  const toggleSize = () => {
    if (collapseToggle == false) {
      console.log("expand leftNav");
      setCollapseToggle(true);
    } else {
      console.log("collapse leftNav");
      setCollapseToggle(false);
    }
  };

  function collapsed() {
    if (collapseToggle == true) {
      return styles.LeftNav__expanded;
    } else {
      return;
    }
  }

  useEffect(() => {
    collapsed();
  }, [collapseToggle]);

  return (
    <div className={styles.leftNav__body + " " + collapsed()}>
      <ul className={styles.leftNav__menu}>
        <h1 className={styles.digitap}>Digitap</h1>
        <LeftNav__item
          activeContent={activeContent}
          title={"Vakken"}
          icon={"url(vakkenIcon.svg)"}
          position={0}
          changeActive={changeActive}
          collapsed={collapseToggle}
        />
        <LeftNav__item
          activeContent={activeContent}
          title={"Rooster"}
          icon={"url(roosterIcon.svg)"}
          position={1}
          changeActive={changeActive}
          collapsed={collapseToggle}
        />
        <LeftNav__item
          activeContent={activeContent}
          title={"Admin"}
          icon={"url(adminIcon.svg)"}
          position={2}
          changeActive={changeActive}
          collapsed={collapseToggle}
        />
        <LeftNav__item
          activeContent={activeContent}
          title={"Tools"}
          icon={"url(toolsIcon.svg)"}
          position={3}
          changeActive={changeActive}
          collapsed={collapseToggle}
        />
        <LeftNav__item
          activeContent={activeContent}
          title={"Account"}
          icon={"url(accountIcon.svg)"}
          position={4}
          changeActive={changeActive}
          collapsed={collapseToggle}
        />
        <div className={styles.fillEnd}></div>
      </ul>
      <div className={midStyles.midNav__container}>
        <MidNav inhoud={activeContent} />
      </div>
    </div>
  );
}
