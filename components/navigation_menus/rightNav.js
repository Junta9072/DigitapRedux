import Vandaag from "../rightNav/vandaag";
import AllDeadlines from "../rightNav/allDeadlines";
import WeekDeadlines from "../rightNav/weekDeadlines";
import MonthDeadlines from "../rightNav/monthDeadlines";
import AutoVak from "../autoVak/autoVak";

import RoosterRightNav from "../rightNav/roosterRightNav";
import WeekOverview from "../rightNav/weekOverview";
import MonthOverview from "../rightNav/monthOverview";
import ThirtyDaysOverview from "../rightNav/thirtyDaysOverview";

import AdminRightNav from "../rightNav/adminRightNav";
import AutoAdmin from "../rightNav/autoAdmin";

import ToolsRightNav from "../rightNav/toolsRightNav";
import ContactForm from "../rightNav/contactForm";
import Quiz from "../rightNav/quiz";
import ExternalWebsite from "../rightNav/externalWebsite";

import AccountRightNav from "../rightNav/accountRightNav";
import MijnGegevens from "../rightNav/mijnGegevens";
import MijnVoorkeuren from "../rightNav/mijnVoorkeuren";
import AboutDigitap from "../rightNav/aboutDigitap";

import { useState, useEffect } from "react";

export default function RightNav(props) {
  const [rightNavContent, setRightNavContent] = useState(<Vandaag />);

  function vakRightNavSwitch() {
    if (props.inhoud >= 5) {
      setRightNavContent(<AutoVak vak={props.inhoud - 4} />);
    } else {
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

        default:
          setRightNavContent(<Vandaag />);
          break;
      }
    }
  }

  function roosterRightNavSwitch() {
    switch (props.inhoud) {
      case 0:
        setRightNavContent(<RoosterRightNav />);
        break;
      //Rooster Components
      /*
      case 1:
        settRightNavContent(<WeekOverview />);
        break;
      case 2:
        setRightNavContent(<MonthOverview />);
        break;
      case 3:
        setRightNavContent(<ThirtyDaysOverview />);
        break;
        */

      default:
        break;
    }
  }

  function adminRightNavSwitch() {
    switch (props.inhoud) {
      case 0:
        setRightNavContent(<AdminRightNav />);
        break;
      /*
        case 1:
          setRightNavContent(<autoAdmin />)
          break;
          */

      default:
        break;
    }
  }

  function toolsRightNavSwitch() {
    switch (props.inhoud) {
      case 0:
        setRightNavContent(<ToolsRightNav />);
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
      case 0:
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
  }, [props.inhoud, props.section]);

  return <>{rightNavContent}</>;
}
