import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export default function LoginForm() {
  const loginSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      username: event.target.username.value,
      password: event.target.password.value,
      email: event.target.email.value,
    };
    const JSONLoginData = JSON.stringify(loginData);

    const endpoint = "api/login/newUserForm";
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
    console.log(Object.keys(result).length);
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
          type="text"
          id="username"
          name="username"
          className={styles.form__input + " " + styles.form__userInput}
        />
        <label
          for="password"
          className={styles.form__label + " " + styles.form__passLabel}
        >
          Password
        </label>
        <input
          type="text"
          id="password"
          name="password"
          className={styles.form__input + " " + styles.form__passInput}
        />
        <label
          for="repeatPassword"
          className={styles.form__label + " " + styles.form__mailLabel}
        >
          Email:
        </label>
        <br />
        <input
          className={styles.form__input + " " + styles.form__mailInput}
          type="text"
          id="email"
          name="email"
        />
        <br />
        <button type="submit" className={styles.form__submit}>
          <i className={"material-icons-outlined " + styles.md24}>
            arrow_forward
          </i>
        </button>
      </form>
    </>
  );
}
