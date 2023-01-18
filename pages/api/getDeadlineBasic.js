import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    database: "nodelogin",
    user: "root",
    password: "",
  });

  let body = JSON.parse(req.body);

  try {
    console.log("stored traject = " + body.traject);
    const query =
      "SELECT *  FROM `deadlines` WHERE `traject_ID`=? ORDER BY `deadline_date` ASC;";
    const values = [body.traject];
    const [data] = await dbconnection.execute(query, values);
    let deadlineBasicAPIResult = data;
    let queryORlist = "";
    data.forEach((item, i) => {
      if (i == 0) {
        queryORlist = queryORlist + " koepel_ID=" + item.koepel_ID;
      } else queryORlist = queryORlist + " OR koepel_ID=" + item.koepel_ID;
    });

    try {
      console.log("stored traject = " + body.traject);
      const query =
        "SELECT `koepel_ID`,`vak_ID`,`vak_name`,`vak_fullname` FROM `koepel` WHERE " +
        queryORlist;
      const values = [];
      const [data] = await dbconnection.execute(query, values);
      let koepelAPIResult = data;

      res.status(200).json({
        koepelInfo: koepelAPIResult,
        deadlineBasicInfo: deadlineBasicAPIResult,
      });

      dbconnection.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
