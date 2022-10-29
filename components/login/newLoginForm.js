import { useEffect, useState } from "react";

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
      <form onSubmit={loginSubmit}>
        <label for="username">Username:</label>
        <br />
        <input type="text" id="username" name="username" />
        <br />
        <label for="password">Wachtwoord:</label>
        <br />
        <input type="text" id="password" name="password" />
        <br />
        <label for="repeatPassword">Email:</label>
        <br />
        <input type="text" id="email" name="email" />
        <br />
        <button type="submit">login</button>
      </form>
    </>
  );
}
