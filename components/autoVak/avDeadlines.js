import { useEffect, useState } from "react";
import { getWeekDay, getTxtMonth } from "../../helpers/time";

export default function AVDeadlines(props) {
  const [vakDeadlines, setVakDeadlines] = useState("");

  function filterDeadlines(deadline) {
    return deadline.koepel_ID == props.vak;
  }

  function renderDeadlines(input) {
    let filterDdl = input.filter(filterDeadlines);
    setVakDeadlines(
      filterDdl.map((ddl) => {
        let ddlDate = new Date(ddl.deadline_date);
        return (
          <li>
            <span>{ddl.deadline_name}</span>{" "}
            <span>
              {ddlDate.getDate() + " " + getTxtMonth(ddlDate.getMonth())}
            </span>
          </li>
        );
      })
    );
  }

  const deadlineOphalen = async () => {
    const loginData = {
      traject: sessionStorage.getItem("traject"),
    };
    const JSONLoginData = JSON.stringify(loginData);

    const endpoint = "api/getDeadlineBasic";
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
    renderDeadlines(result.deadlineBasicInfo.filter(filterDeadlines));
  };

  useEffect(() => {
    deadlineOphalen();
  }, [props.vak]);
  return (
    <ul>
      <p>Komende Deadlines voor dit vak:</p>
      {vakDeadlines}
    </ul>
  );
}
