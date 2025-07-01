import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "db_ejp",
});

export default db;
