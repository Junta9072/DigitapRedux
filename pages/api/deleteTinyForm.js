import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    database: "nodelogin",
    user: "root",
    password: "",
  });

  let body = JSON.parse(req.body);
  console.log(body.count);

  try {
    const query = "DELETE FROM " + body.table + " WHERE `ID` = ?";
    const values = [body.ID];
    const [data] = await dbconnection.execute(query, values);
    let tinyFormResultData = data;

    res.status(200).json({ tinyFormResult: tinyFormResultData });

    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
