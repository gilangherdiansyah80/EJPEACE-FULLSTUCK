import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "12345",
  database: "db_ejp",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal konek ke database:");
    console.error("Kode Error:", err.code);
    console.error("Pesan Error:", err.message);
    return;
  }
  console.log("✅ Berhasil konek ke database!");
});

export default db;
