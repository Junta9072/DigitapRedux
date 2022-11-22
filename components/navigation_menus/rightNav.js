import Vandaag from "../rightNav/vandaag";
import AllDeadlines from "../rightNav/allDeadlines";

import { useState, useEffect } from "react";

export default function RightNav(props) {
  function RightNavInhoud() {
    switch (props.inhoud) {
      case 1:
        return <Vandaag />;
        break;
      case 2:
        return <AllDeadlines />;
        break;

      default:
        break;
    }
  }

  return <>{RightNavInhoud()}</>;
}
