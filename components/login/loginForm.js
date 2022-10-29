import { useEffect, useState } from "react";

export default function LoginForm() {
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
    window.location.href = result.url;
  };

  return (
    <>
      <form onSubmit={loginSubmit}>
        <label for="username">Username:</label>
        <br />
        <input type="text" id="username" name="username" />
        <br />
        <label for="password">Wachtwoord:</label>
        <br />
        <input type="text" id="password" name="password" />
        <br />
        <button type="submit">login</button>
      </form>
    </>
  );
}
