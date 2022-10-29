import VakkenContent from "../vakken/vakkenContent.js";

import Vak_MidNav from "../midnav/vak_midNav";
import Rooster_MidNav from "../midnav/rooster_midNav";
import Admin_MidNav from "../midnav/admin_midNav";
import Tools_MidNav from "../midnav/tools_midNav";
import Account_MidNav from "../midnav/account_midNav";

import { useState, useEffect } from "react";

export default function RightNav(props) {
  const [midNavContent, setMidNavContent] = useState("peepeepoopoo");

  useEffect(() => {
    switch (props.inhoud) {
      case 0:
        setMidNavContent(<Vak_MidNav />);
        break;
      case 1:
        setMidNavContent(<Rooster_MidNav />);
        break;
      case 2:
        setMidNavContent(<Admin_MidNav />);
        break;
      case 3:
        setMidNavContent(<Tools_MidNav />);
        break;
      case 4:
        setMidNavContent(<Account_MidNav />);
        break;
      default:
        break;
    }
  }, [props.inhoud]);

  return (
    <div className="midBody">
      <ul className="midNav">{midNavContent}</ul>
      {/*inhoud van de pagina*/}
    </div>
  );
}
