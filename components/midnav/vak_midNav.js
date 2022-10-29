import { useState, useEffect } from "react";

export default function Vak_MidNav() {
  const [trajectData, setTrajectData] = useState("");
  const [trajectListing, setTrajectListing] = useState("leeg");

  const trajectOphalen = async () => {
    const loginData = {
      traject: sessionStorage.getItem("traject"),
    };
    const JSONLoginData = JSON.stringify(loginData);

    const endpoint = "api/getTraject";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "applications/json",
      },
      body: JSONLoginData,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    setTrajectData(result.trajectInfo);
  };

  function mapTraject() {
    if (!trajectData) {
      setTrajectListing("kon geen data vinden");
    } else {
      setTrajectListing(
        trajectData.map((vak) => {
          return <li key={vak.vak_name}>{vak.vak_name}</li>;
        })
      );
    }
  }

  useEffect(() => {
    trajectOphalen();
  }, []);

  useEffect(() => {
    mapTraject();
  }, [trajectData]);

  return (
    <li>
      <ul className="midNav__vakken--general">
        <li>Vandaag</li>
        <li>Alle deadlines</li>
        <li>Komende 7 dagen</li>
        <li>Komende 30 dagen</li>
      </ul>
      <ul className="midNav__classes">{trajectListing}</ul>
    </li>
  );
}
