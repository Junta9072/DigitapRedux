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
      console.log(body);
      const query =
        "INSERT INTO accounts (ID, username, password, email) VALUES (NULL, ?, ?, ?);";
      const values = [body.username, body.password, body.email];
      const [data] = await dbconnection.execute(query, values);
      let loginData = data;
      if (Object.keys(loginData).length == 0) {
        res.json({ error: "no user account found" });
      } else {
        res.json({ loginResponse: loginData });
        res.redirect(307, "/succes");
      }

      dbconnection.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
