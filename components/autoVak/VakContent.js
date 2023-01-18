import { useEffect, useState } from "react";

import ContentText from "./Content/ContentText";
import ContentTextImg from "./Content/ContentTextImg";
import ContentMessageBoard from "./Content/ContentMsgBoard";
import ContentAnchor from "./Content/ContentAnchor";
import ContentGroup from "./Content/ContentGroup";

import LectorAnchor from "./lectorContent/LectorAnchor";
import LectorGroup from "./lectorContent/LectorGroup";
import LectorText from "./lectorContent/LectorText";
import LectorMessageBoard from "./lectorContent/LectorMsgBoard";
import LectorTextImg from "./lectorContent/LectorTextImg";

import NewItemButton from "./NewItemButton";

export default function VakContent(props) {
  const [lectorButton, setLectorButton] = useState("");
  const [vakContent, setVakContent] = useState("");
  const [itemIndex, setItemIndex] = useState(0);

  function subMap(index, contentArray) {
    console.log("submap");
    let content = props.content.vakContent;
    let assembly = contentArray.map((item, i) => {
      console.log(content[item]);
      return contentMapper(content[item]);
    });
    groupCooldown = contentArray.length;
    console.log(groupCooldown);
    return assembly;
  }

  //vakContent types: msgBoard, link_web, link_pdf, link_video, link_ppt, group, text_img, text
  function contentMapper(item, i) {
    let lector = sessionStorage.getItem("lector");
    console.log(lector);
    if (lector == 0) {
      console.log("item log:");
      console.log(item);
      if (item) {
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
      } else {
        console.log("NO ITEM");
      }
    } else {
      console.log("item log:");
      console.log(item);
      if (item) {
        if (item.content_type == "text") {
          return <LectorText data={item} />;
        } else if (item.content_type == "text_img") {
          return <LectorTextImg data={item} />;
        } else if (item.content_type == "msgboard") {
          return <LectorMessageBoard data={item} />;
        } else if (
          item.content_type == "link_web" ||
          item.content_type == "link_ppt" ||
          item.content_type == "link_pdf" ||
          item.content_type == "link_video"
        ) {
          return <LectorAnchor data={item} />;
        } else if (item.content_type == "group") {
          //groepcooldown op de length van de array zetten
          return (
            <LectorGroup data={item}>
              {subMap(i, JSON.parse(item.content_extra).group_content)}
            </LectorGroup>
          );
        }
      } else {
        console.log("NO ITEM");
      }
    }
  }

  let assembly = "";
  let counter = "";
  let groupCooldown = 0;
  useEffect(() => {
    if (props.content.vakContent) {
      setItemIndex(props.content.vakContent.length);
      let content = props.content.vakContent;

      console.log(content.length);
      assembly = content.map((item, i) => {
        //check for cooldown, wanneer een groep de volgende items al gerenderd heeft
        if (groupCooldown == 0) {
          return contentMapper(item, i);
        } else {
          //als ze al gerenderd zijn door de voorkomende groep dan moet er gewoon niets gereturned worden
          console.log(groupCooldown);
          groupCooldown = groupCooldown - 1;
          return "";
        }
      });
    }
    setVakContent(assembly);
  }, [props.content.vakContent]);

  useEffect(() => {
    if (sessionStorage.getItem("lector") == 1) {
      setLectorButton(<NewItemButton count={itemIndex} />);
    }
  }, [props]);

  return (
    <>
      {lectorButton}
      {vakContent}
    </>
  );
}
