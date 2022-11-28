import mysql from "mysql2/promise";

export default async function handler(req, res) {
  //haal het vak op waar op geklikt is en zijn koepel ID
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    database: "nodelogin",
    user: "root",
    password: "",
  });

  let body = JSON.parse(req.body);

  try {
    console.log("stored traject = " + body.traject);
    const query = "SELECT * FROM `koepel` WHERE `vak_ID`=?;";
    const values = [body.vak];
    const [data] = await dbconnection.execute(query, values);
    let vakBasicAPIResult = data;

    let koepelRes = { roosterInfo: vakBasicAPIResult };
    try {
      const query = "SELECT * FROM `koepel_lector/vak` WHERE `vak_ID`=?;";
      const values = [koepelRes.roosterInfo[0].vak_ID];
      const [data] = await dbconnection.execute(query, values);
      let lectorAPIResult = data;

      let lectorRes = { lectorInfo: lectorAPIResult };
      try {
        let queryORlist = "";
        lectorAPIResult.forEach((item, i) => {
          if (i == 0) {
            queryORlist = queryORlist + " lector_ID=" + item.lector_ID;
          } else queryORlist = queryORlist + " OR lector_ID=" + item.lector_ID;
        });
        const query = "SELECT * FROM `lectoren` WHERE " + queryORlist;
        const values = [""];
        const [data] = await dbconnection.execute(query, values);
        let lectorPickingRes = data;

        res.status(200).json({
          vakBasicInfo: vakBasicAPIResult,
          lectorPickingInfo: lectorPickingRes,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    //    res.status(200).json({ roosterInfo: roosterAPIResult });

    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  //--> vak titel & vak full name
  //haal met vak_ID alle lectors op
  //haal met vak_ID alle deadlines op
  //haal met vak_ID alle lessen op
}
