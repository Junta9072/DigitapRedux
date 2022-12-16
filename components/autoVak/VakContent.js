import { useEffect, useState } from "react";

import ContentText from "./ContentText";
import ContentTextImg from "./ContentTextImg";
import ContentMessageBoard from "./ContentMsgBoard";
import ContentAnchor from "./ContentAnchor";
import ContentGroup from "./ContentGroup";

export default function VakContent(props) {
  const [vakContent, setVakContent] = useState("");

  function subMap(index, contentArray) {
    let content = props.content.vakContent;
    let assembly = contentArray.map((item, i) => {
      console.log(content[item]);
      return contentMapper(content[item]);
    });
    groupCooldown = contentArray.length;
    return assembly;
  }

  //vakContent types: msgBoard, link_web, link_pdf, link_video, link_ppt, group, text_img, text
  function contentMapper(item, i) {
    if (item.content_type == "text") {
      return <ContentText data={item} />;
    } else if (item.content_type == "text_img") {
      return <ContentTextImg data={item} />;
    } else if (item.content_type == "msgboard") {
      return <ContentMessageBoard data={item} />;
    } else if (
      item.content_type == "link_web" ||
      item.content_type == "link_ppt" ||
      item.content_type == "link_pdf" ||
      item.content_type == "link_video"
    ) {
      return <ContentAnchor data={item} />;
    } else if (item.content_type == "group") {
      //groepcooldown op de length van de array zetten
      return (
        <ContentGroup data={item}>
          {subMap(i, JSON.parse(item.content_extra).group_content)}
        </ContentGroup>
      );
    }
  }

  let assembly = "";
  let groupCooldown = 0;
  if (props.content.vakContent) {
    let content = props.content.vakContent;
    assembly = content.map((item, i) => {
      //check for cooldown, wanneer een groep de volgende items al gerenderd heeft
      if (groupCooldown == 0) {
        return contentMapper(item, i);
      } else {
        //als ze al gerenderd zijn door de voorkomende groep dan moet er gewoon niets gereturned worden
        groupCooldown = groupCooldown - 1;
        return "";
      }
    });
  }

  useEffect(() => {
    setVakContent(assembly);
  }, [props]);

  return <>{vakContent}</>;
}
