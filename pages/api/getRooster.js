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
    const query = "SELECT * FROM `rooster` WHERE `traject_ID`=?;";
    const values = [body.traject];
    const [data] = await dbconnection.execute(query, values);
    let roosterAPIResult = data;

    res.status(200).json({ roosterInfo: roosterAPIResult });

    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
