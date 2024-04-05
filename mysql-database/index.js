import express from "express";
import cors from "cors";
import { db } from "./db.js";
import multer from "multer";
import path from "path";

const app = express();
const port = 8800;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// app.get("/api/services/:id", (req, res) => {
//   const sql = "SELECT * FROM service WHERE service_id = ?";
//   const id = req.params.id;
//   db.query(sql, [id], (err, results) => {
//     if (err) throw err;
//     res.json(results[0]);
//   });
// });

app.get("/api/services/:sname", (req, res) => {
  const sql = "SELECT * FROM service WHERE service_name = ?";
  const sname = decodeURIComponent(req.params.sname).replace(/-/g, " ");
  // console.log("Fetching service details for name:", sname);
  db.query(sql, [sname], (err, results) => {
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

app.post("/api/contact", (req, res) => {
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

app.post("/api/services", (req, res) => {
  const { service_name, image_path, description, full_description } = req.body;
  const isActive = true;
  const date_created = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

  const sql =
    "INSERT INTO service (service_name, image_path, description, full_description, isActive, date_created) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      service_name,
      image_path,
      description,
      full_description,
      isActive,
      date_created,
    ],
    (err, results) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "An error occurred while inserting the service." });
      } else {
        res.json({ success: true, message: "Service added successfully." });
      }
    }
  );
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../services-project-vite/src/assets/images/service");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/api/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
