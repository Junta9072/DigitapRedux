import MidNav from "./midNav.js";
import LeftNav__item from "../leftnav/leftNav__item";

import { useEffect, useState } from "react";
import styles from "../../styles/LeftNav.module.css";
import LeftNav__collapse from "../leftnav/leftNav__collapse.js";

export default function LeftNav() {
  const [activeContent, setActiveContent] = useState(0);

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
    console.log("peepeepoopoo");
  };

  return (
    <div className={styles.leftNav__body}>
      <ul className={styles.LeftNav}>
        <LeftNav__item
          activeContent={activeContent}
          title={"Vakken"}
          icon={"url(vakkenIcon.svg)"}
          position={0}
          changeActive={changeActive}
        />
        <LeftNav__item
          activeContent={activeContent}
          title={"Rooster"}
          icon={"url(roosterIcon.svg)"}
          position={1}
          changeActive={changeActive}
        />
        <LeftNav__item
          activeContent={activeContent}
          title={"Admin"}
          icon={"url(adminIcon.svg)"}
          position={2}
          changeActive={changeActive}
        />
        <LeftNav__item
          activeContent={activeContent}
          title={"Tools"}
          icon={"url(toolsIcon.svg)"}
          position={3}
          changeActive={changeActive}
        />
        <LeftNav__item
          activeContent={activeContent}
          title={"Account"}
          icon={"url(accountIcon.svg)"}
          position={4}
          changeActive={changeActive}
        />

        <LeftNav__collapse toggleSize={toggleSize} />
      </ul>
      <div className={styles.midNav__container}>
        <MidNav inhoud={activeContent} />
      </div>
    </div>
  );
}
