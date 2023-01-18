import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    database: "nodelogin",
    user: "root",
    password: "",
  });

  let body = JSON.parse(req.body);

  console.log(
    body.table,
    body.content_extra,
    body.content_textContent,
    body.content_img_1,
    body.content_title
  );
  try {
    const query =
      "UPDATE " +
      body.table +
      " SET `content_title`=?, `content_textContent`=?,`content_extra`=?,`content_img_1`=? WHERE ID = ?";

    const values = [
      body.content_title,
      body.content_textContent,
      body.content_extra,
      body.content_img_1,
      body.ID,
    ];
    const [data] = await dbconnection.execute(query, values);
    let tinyFormResultData = data;

    res.status(200).json({ tinyFormResult: tinyFormResultData });

    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
