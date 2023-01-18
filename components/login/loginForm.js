import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export default function LoginForm(props) {
  const loginSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    const JSONLoginData = JSON.stringify(loginData);

    const endpoint = "api/login/loginForm";
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
    sessionStorage.setItem("traject", result.loginResults[0].traject_ID);
    sessionStorage.setItem("lector", result.loginResults[0].admin);
    window.location.href = result.url;
  };

  return (
    <>
      <form onSubmit={loginSubmit} className={styles.login__form}>
        <label
          for="username"
          className={styles.form__label + " " + styles.form__userLabel}
        >
          Username
        </label>

        <input
          className={styles.form__input + " " + styles.form__userInput}
          type="text"
          id="username"
          name="username"
        />

        <label
          for="password"
          className={styles.form__label + " " + styles.form__passLabel}
        >
          Password
        </label>

        <input
          className={styles.form__input + " " + styles.form__passInput}
          type="password"
          id="password"
          name="password"
        />

        <button type="submit" className={styles.form__submit}>
          <i className={"material-icons-outlined " + styles.md24}>
            arrow_forward
          </i>
        </button>
      </form>
    </>
  );
}
