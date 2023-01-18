import VakkenContent from "../vakken/vakkenContent.js";
import styles from "../../styles/MidNav.module.css";

import Vak_MidNav from "../midnav/vak_midNav";
import Rooster_MidNav from "../midnav/rooster_midNav";
import Admin_MidNav from "../midnav/admin_midNav";
import Tools_MidNav from "../midnav/tools_midNav";
import Account_MidNav from "../midnav/account_midNav";

import RightNav from "./rightNav";

import { useState, useEffect } from "react";

export default function MidNav(props) {
  const [midNavContent, setMidNavContent] = useState("peepeepoopoo");
  const [midNavTitle, setMidnavTitle] = useState("peepeepoopoo");
  const [rightNavSwitch, setRightNavSwitch] = useState(1);
  const [activeVak, setActiveVak] = useState(1);

  const setRightNav = (arg) => {
    console.log("catch!" + arg);
    let prev = JSON.parse(sessionStorage.getItem("nav"));
    prev.rightNav[props.inhoud] = arg;
    let post = JSON.stringify(prev);
    sessionStorage.setItem("nav", post);
    setRightNavSwitch(arg);
    setActiveVak(arg);
  };

  const navigate = (arg, section) => {
    console.log("arg=" + arg + " section=" + section);
    if (section != "" || section != undefined) {
      props.sectionChange(section - 1);
      setRightNavSwitch(arg + 1);
      setActiveVak(arg + 1);
    } else {
      setRightNavSwitch(arg + 1);
      setActiveVak(arg + 1);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    console.log("check for sStorage");
    if (sessionStorage.getItem("nav")) {
      let data = JSON.parse(sessionStorage.getItem("nav"));
      setRightNavSwitch(data.rightNav[props.inhoud]);
      setActiveVak(data.rightNav[props.inhoud]);

      if (props.inhoud == 0 || props.inhoud == 3) {
        setActiveVak(data.rightNav[props.inhoud] + 1);
        setRightNavSwitch(data.rightNav[props.inhoud]);
      }
    } else {
      setRightNavSwitch(0);
      setActiveVak(0);

      if (props.inhoud == 0 || props.inhoud == 3) {
        setActiveVak(1);
        setRightNavSwitch(0);
      }
    }
  }, [props.inhoud]);

  useEffect(() => {
    switch (props.inhoud) {
      case 0:
        setMidNavContent(
          <Vak_MidNav setRightNav={setRightNav} activeVak={activeVak} />
        );
        setMidnavTitle("Vakken");
        break;
      case 1:
        setMidNavContent(
          <Rooster_MidNav setRightNav={setRightNav} activeVak={activeVak} />
        );
        setMidnavTitle("Rooster");
        break;
      case 2:
        setMidNavContent(<Admin_MidNav setRightNav={setRightNav} />);
        setMidnavTitle("Admin");
        break;
      case 3:
        setMidNavContent(
          <Tools_MidNav setRightNav={setRightNav} activeVak={activeVak} />
        );
        setMidnavTitle("Tools");
        break;
      case 4:
        setMidNavContent(<Account_MidNav />);
        setMidnavTitle("Account");
        break;
      default:
        break;
    }
  }, [props.inhoud, activeVak]);

  return (
    <div className={styles.midBody}>
      <ul className={styles.midNav__content}>
        <h1 className={styles.midNav__title}>{midNavTitle}</h1>
        {midNavContent}
      </ul>
      <RightNav
        section={props.inhoud}
        inhoud={rightNavSwitch}
        navigate={navigate}
      />
    </div>
  );
}
