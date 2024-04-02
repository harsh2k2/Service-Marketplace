import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
const port = 8800;

app.use(cors());
app.use(express.json());

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.get("/api/services/:id", (req, res) => {
  const sql = "SELECT * FROM service WHERE service_id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.get("/api/services", (req, res) => {
  const sql = "SELECT * FROM service";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// app.post("/api/contact", (req, res) => {
//   const { contact_name, contact_email, contact_phone, message } = req.body;
//   const contact_date = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

//   const sql =
//     "INSERT INTO contact (contact_name, contact_email, contact_phone, contact_date, message) VALUES (?, ?, ?, ?, ?)";
//   db.query(
//     sql,
//     [contact_name, contact_email, contact_phone, contact_date, message],
//     (err, results) => {
//       if (err) throw err;
//       res.json({ success: true });
//     }
//   );
// });

app.post("/api/contact", (req, res) => {
  const { fullname, email, phone, message } = req.body;
  const contact_date = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

  const sql =
    "INSERT INTO contact (contact_name, contact_email, contact_phone, contact_date, message) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [fullname, email, phone, contact_date, message],
    (err, results) => {
      if (err) throw err;
      res.json({ success: true });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
