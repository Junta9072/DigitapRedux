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
    const query =
      "SELECT * FROM `vak_content` WHERE `bundle_ID`=? ORDER BY `chronology` ASC;";
    //1 is het testVak met placeholder Content
    const values = [body.bundle];
    const [data] = await dbconnection.execute(query, values);
    let vakContentAPIResult = data;

    res.status(200).json({ vakContent: vakContentAPIResult });

    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
