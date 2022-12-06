import { useState, useEffect } from "react";
import { getTxtMonth, filterDate } from "../../helpers/time";

export default function MonthDeadlines() {
  const [DDLAPIresult, setDDLAPIresult] = useState("");
  const [monthDDL, setMonthDDL] = useState("");

  function thirtyDaysFilter(ddl) {
    return filterDate(new Date(ddl.deadline_date), 30);
  }

  function renderDeadlines(input) {
    let filterDdl = input;
    setMonthDDL(
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
    renderDeadlines(result.deadlineBasicInfo.filter(thirtyDaysFilter));
  };

  useEffect(() => {
    deadlineOphalen();
  }, []);
  return <ul>{monthDDL}</ul>;
}
