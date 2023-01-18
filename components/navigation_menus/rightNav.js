import Vandaag from "../rightNav/vandaag";
import AllDeadlines from "../rightNav/allDeadlines";
import WeekDeadlines from "../rightNav/weekDeadlines";
import MonthDeadlines from "../rightNav/monthDeadlines";
import AutoVak from "../autoVak/autoVak";

import RoosterRightNav from "../rightNav/roosterRightNav";
import WeekOverview from "../rightNav/weekOverview";
import MonthOverview from "../rightNav/monthOverview";

import AdminRightNav from "../rightNav/adminRightNav";
import AutoAdmin from "../rightNav/autoAdmin";

import Uitlenen from "../rightNav/uitlenen";
import ContactForm from "../rightNav/contactForm";
import Quiz from "../rightNav/quiz";
import ExternalWebsite from "../rightNav/externalWebsite";

import AccountRightNav from "../rightNav/accountRightNav";
import MijnGegevens from "../rightNav/mijnGegevens";
import MijnVoorkeuren from "../rightNav/mijnVoorkeuren";
import AboutDigitap from "../rightNav/aboutDigitap";

import { useState, useEffect } from "react";

export default function RightNav(props) {
  const navigate = (arg, section) => {
    console.log("upward RN " + arg);
    props.navigate(arg, section);
  };
  const [rightNavContent, setRightNavContent] = useState(
    <Vandaag navigate={navigate} />
  );

  function vakRightNavSwitch() {
    if (props.inhoud >= 2) {
      setRightNavContent(<AutoVak vak={props.inhoud - 1} />);
    } else {
      setRightNavContent(<Vandaag navigate={navigate} />);
    }
  }

  function roosterRightNavSwitch() {
    if (props.inhoud % 2 == 0) {
      setRightNavContent(<WeekOverview navigate={navigate} />);
    } else {
      setRightNavContent(<MonthOverview navigate={navigate} />);
    }
  }

  function adminRightNavSwitch() {
    setRightNavContent(<AdminRightNav />);
  }

  function toolsRightNavSwitch() {
    switch (props.inhoud) {
      case 0:
        setRightNavContent(<Uitlenen navigate={navigate} />);
        break;
      case 1:
        setRightNavContent(<Uitlenen navigate={navigate} />);
        break;
      //Componenten voor tools
      /*
case 1:
  setRightNavContent(<ContactForm />)
  break;
  case 2:
    setRightNavContent(<Quiz />)
    break;
    case 3:
      setRightNavContent(<ExternalWebsite />)
      break;
      */
      default:
        break;
    }
  }

  function AccountRightNavSwitch() {
    switch (props.inhoud) {
      case 1:
        setRightNavContent(<AccountRightNav />);
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
      case 3:
        toolsRightNavSwitch();
        break;
      case 4:
        AccountRightNavSwitch();
        break;
      default:
        break;
    }
    console.log(props.inhoud, props.section);
  }, [props.inhoud, props.section]);

  return <>{rightNavContent}</>;
}
