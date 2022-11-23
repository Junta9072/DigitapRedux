import Vandaag from "../rightNav/vandaag";
import AllDeadlines from "../rightNav/allDeadlines";
import WeekDeadlines from "../rightNav/weekDeadlines";
import MonthDeadlines from "../rightNav/monthDeadlines";
import AutoVak from "../autoVak";

import RoosterRightNav from "../rightNav/roosterRightNav";

import AdminRightNav from "../rightNav/adminRightNav";

import { useState, useEffect } from "react";

export default function RightNav(props) {
  const [rightNavContent, setRightNavContent] = useState(<Vandaag />);

  function vakRightNavSwitch() {
    console.log(props.inhoud);
    switch (props.inhoud) {
      case 1:
        setRightNavContent(<Vandaag />);
        break;
      case 2:
        setRightNavContent(<AllDeadlines />);
        break;
      case 3:
        setRightNavContent(<WeekDeadlines />);
        break;
      case 4:
        setRightNavContent(<MonthDeadlines />);
        break;
      case 5:
        setRightNavContent(<AutoVak />);
        break;

      default:
        setRightNavContent(<Vandaag />);
        break;
    }
  }

  function roosterRightNavSwitch() {
    switch (props.inhoud) {
      case 0:
        console.log("roosterSwitch");
        setRightNavContent(<RoosterRightNav />);
        break;

      default:
        break;
    }
  }

  function adminRightNavSwitch() {
    switch (props.inhoud) {
      case 0:
        console.log("adminSwitch");
        setRightNavContent(<AdminRightNav />);
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    switch (props.section) {
      case 0:
        vakRightNavSwitch();
        break;
      case 1:
        roosterRightNavSwitch();
        break;
      case 2:
        adminRightNavSwitch();
        break;
      default:
        break;
    }
  }, [props.inhoud, props.section]);

  return <>{rightNavContent}</>;
}
