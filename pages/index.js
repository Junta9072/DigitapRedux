import { useState, useEffect } from "react";

import Link from "next/link";
import styles from "../styles/Home.module.css";

import LoginForm from "../components/login/loginForm.js";
import NewLoginForm from "../components/login/newLoginForm";
import AniText from "../components/login/aniText";

export default function Home() {
  const [loginSwitch, setLoginSwitch] = useState("old");
  const [loginContent, setLoginContent] = useState(<LoginForm />);
  const [userLoginMessage, setUserLoginMessage] = useState("new user");
  const [formButton, setFormButton] = useState("");

  useEffect(() => {
    if (loginSwitch == "old") {
      setLoginContent(<LoginForm />);
      setUserLoginMessage("make new account");
      setFormButton("");
    } else {
      setLoginContent(<NewLoginForm />);
      setUserLoginMessage("i already have an account");
      setFormButton(styles.form__new);
    }
  }, [loginSwitch]);

  return (
    <div className={styles.page}>
      <div className={styles.fancyText__container}>
        <div className={styles.fancyText__content}>
          <AniText
            text={
              "DigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitap"
            }
          />
          <AniText
            text={
              "DigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitap"
            }
          />
          <AniText
            text={
              "DigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitap"
            }
          />
          <AniText
            text={
              "DigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitap"
            }
          />
          <AniText
            text={
              "DigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitap"
            }
          />
          <AniText
            text={
              "DigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitapDigitap"
            }
          />
        </div>
      </div>

      <div className={styles.form__container}>
        {loginContent}
        <button
          className={styles.newLogin + " " + formButton}
          onClick={() => {
            if (loginSwitch == "old") {
              setLoginSwitch("new");
            } else {
              setLoginSwitch("old");
            }
          }}
        >
          {userLoginMessage}
          <i className={"material-icons-outlined " + styles.md24}>person_add</i>
        </button>
      </div>
    </div>
  );
}
