import { useState, useEffect } from "react";
import AVLessen from "./avLessen";
import AVDeadlines from "./avDeadlines";

export default function AutoVak(props) {
  const [vakTitel, setVakTitel] = useState("");
  const [vakLectoren, setVakLectoren] = useState("");
  const [lessenAPIResult, setLessenAPIResult] = useState("");

  //asnyc vak info ophalen
  const VakInfoOphalen = async () => {
    const loginData = {
      vak: props.vak,
    };
    const JSONLoginData = JSON.stringify(loginData);

    const endpoint = "api/autoVakFormatter";
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
    setVakTitel(result.vakBasicInfo[0].vak_fullname);
    setVakLectoren(
      result.lectorPickingInfo.map((lector) => {
        return <p>{lector.lector_name}</p>;
      })
    );
    setLessenAPIResult(result.lessenInfo);
  };

  useEffect(() => {
    VakInfoOphalen();
  }, [props.vak]);
  //damn
  return (
    <div>
      <h1>{vakTitel}</h1>
      <div>{vakLectoren}</div>
      <AVLessen data={lessenAPIResult} />
      <AVDeadlines vak={props.vak} />
    </div>
  );
}
