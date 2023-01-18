import { useState, useEffect } from "react";
import styles from "../../styles/Tools.module.css";
import InfoBlock from "./infoBlock";

export default function Uitlenen() {
  const [toolsContent, setToolsContent] = useState("");
  const [uitlenenContent, setUitlenenContent] = useState("");

  function renderToolsContent(tools) {
    let groups = [];
    let prevBundleID = 0;
    tools.forEach((item, i) => {
      console.log(groups.find((bundle) => bundle.id == item.bundle_ID));
      if (groups.find((bundle) => bundle.id == item.bundle_ID) == undefined) {
        groups.push({ id: item.bundle_ID, content: [item] });
      } else {
        groups.find((bundle) => bundle.id == item.bundle_ID).content.push(item);
      }
    });
    console.log(groups);

    setUitlenenContent(
      groups.map((item) => {
        let title = item.content.find((item) => item.content_type == "title");
        let img = item.content.find((item) => item.content_type == "img");
        let text = item.content.find((item) => item.content_type == "text");
        let contact = item.content.find(
          (item) => item.content_type == "contact"
        );
        return (
          <InfoBlock title={title} img={img} text={text} contact={contact} />
        );
      })
    );
  }

  const toolsOphalen = async () => {
    const loginData = {
      traject: sessionStorage.getItem("traject"),
      bundle: 1,
    };
    const JSONLoginData = JSON.stringify(loginData);

    const endpoint = "api/getToolsContent";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "applications/json",
      },
      body: JSONLoginData,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(result);
    setToolsContent(result.toolsContent);
    renderToolsContent(result.toolsContent);
  };

  useEffect(() => {
    toolsOphalen();
  }, []);

  return (
    <div className={styles.tools__scrollable}>
      <header className={styles.rooster__header}>
        <p className={styles.header__year}>Uitlenen</p>
        <h2 className={styles.header__title}>Uitlenen</h2>
      </header>
      <main className={styles.block__grid}>{uitlenenContent}</main>
    </div>
  );
}
