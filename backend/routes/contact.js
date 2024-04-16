import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/api/contact", (req, res) => {
  const { fullname, email, phone, message, service_name } = req.body;
  const contact_date = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

  const sql =
    "INSERT INTO contact (contact_name, contact_email, contact_phone, contact_date, message, service_name) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [fullname, email, phone, contact_date, message, service_name],
    (err, results) => {
      if (err) throw err;
      res.json({ success: true });
    }
  );
});

router.get("/api/contact/responses", (req, res) => {
  const sql = "SELECT * FROM contact";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

export default router;
