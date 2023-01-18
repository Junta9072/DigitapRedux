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
      "SELECT *  FROM `deadlines` WHERE `traject_ID`=1  ORDER BY `deadline_date` ASC;";
    const values = [];
    const [data] = await dbconnection.execute(query, values);
    let deadlineIDCounter = data.length;
    console.log(deadlineIDCounter);

    try {
      const query =
        "INSERT INTO " +
        body.table +
        "(deadline_ID,deadline_name, deadline_date, traject_ID, koepel_ID, deadline_desc, deadline_filetype, deadline_filename) VALUES (?,?,?,1,?,?,?,?)";
      const values = [
        deadlineIDCounter + 1,
        body.deadlineName,
        body.deadlineDate,
        body.koepelID,
        body.deadlineDesc,
        body.deadlineFileType,
        body.deadlineFilename,
      ];
      const [data] = await dbconnection.execute(query, values);
      let tinyFormResultData = data;

      try {
        const query =
          "INSERT INTO `vak_content` (content_id,bundle_ID,chronology,content_type,content_title,content_textContent, content_img_1, content_img_2, deadline_ID,content_extra) VALUES (?,1,?,?,'','','data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7','data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',?,'{}')";
        const values = [
          body.count + 20,
          body.count + 19,
          "text",
          deadlineIDCounter + 1,
        ];
        const [data] = await dbconnection.execute(query, values);
        let tinyFormResultData = data;
        res.status(200).json({ tinyFormResult: tinyFormResultData });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
