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
    const query =
      "INSERT INTO " +
      body.table +
      "(content_id,bundle_ID,chronology,content_type,content_title,content_textContent, content_img_1, content_img_2, deadline_ID,content_extra) VALUES (?,1,?,?,'Title','text','data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7','data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',-1,'{}')";
    const values = [body.count + 1, body.count, body.type];
    const [data] = await dbconnection.execute(query, values);
    let tinyFormResultData = data;

    res.status(200).json({ tinyFormResult: tinyFormResultData });

    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
