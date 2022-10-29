import { useState, useEffect } from "react";

import Link from "next/link";
import styles from "../styles/Home.module.css";
import leftNavStyles from "../styles/LeftNav.module.css";

import LoginForm from "../components/login/loginForm.js";
import NewLoginForm from "../components/login/newLoginForm";

export default function Home() {
  const [loginSwitch, setLoginSwitch] = useState("old");
  const [loginContent, setLoginContent] = useState(<LoginForm />);
  const [userLoginMessage, setUserLoginMessage] = useState("new user");

  useEffect(() => {
    if (loginSwitch == "old") {
      setLoginContent(<LoginForm />);
      setUserLoginMessage("make new account");
    } else {
      setLoginContent(<NewLoginForm />);
      setUserLoginMessage("i already have an account");
    }
  }, [loginSwitch]);

  return (
    <div>
      <div>{loginContent}</div>

      <button
        onClick={() => {
          if (loginSwitch == "old") {
            setLoginSwitch("new");
          } else {
            setLoginSwitch("old");
          }
        }}
      >
        {userLoginMessage}
      </button>
    </div>
  );
}
