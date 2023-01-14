import { useState, useEffect } from "react";
import styles from "../../styles/AutoVak.module.css";
import VakContent from "../autoVak/VakContent";

export default function AdminRightNav(props) {
  const [adminContent, setAdminContent] = useState("");

  const adminOphalen = async () => {
    const loginData = {
      traject: sessionStorage.getItem("traject"),
      bundle: 1,
    };
    const JSONLoginData = JSON.stringify(loginData);

    const endpoint = "api/getAdminContent";
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
    setAdminContent(result.adminContent);
  };

  useEffect(() => {
    adminOphalen();
  }, []);
  return (
    <div className={styles.autoAdmin__container}>
      <div className={styles.autoVak__scrollable}>
        <header className={styles.autoVak__header}>
          <p className={styles.autoVak__abr}>Dossier</p>
          <h3 className={styles.autoVak__title}>Mijn dossier</h3>
        </header>
        <main className={styles.autoVak__content}>
          <VakContent content={{ vakContent: adminContent }} />
        </main>
      </div>
    </div>
  );
}
