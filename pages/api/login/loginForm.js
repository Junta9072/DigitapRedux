import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    database: "nodelogin",
    user: "root",
    password: "",
  });

  let body = JSON.parse(req.body);

  if (req.method === "POST") {
    try {
      console.log(body.username);
      const query = "SELECT * FROM `accounts` WHERE `username` = ?;";
      const values = [body.username];
      const [data] = await dbconnection.execute(query, values);
      let loginData = data;
      if (Object.keys(loginData).length == 0) {
        res.json({ error: "no user account found" });
      } else {
        //res.status(200).redirect(307, "/home");
        res.status(200).json({ loginResults: loginData, url: "/home" });
      }

      dbconnection.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
