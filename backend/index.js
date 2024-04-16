import express from "express";
import cors from "cors";
import { db } from "./db.js";
import multer from "multer";
import path from "path";
import sharp from "sharp";

const app = express();
const port = 8800;

app.use(express.static("public"));

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

app.get("/api/services/firstfour", (req, res) => {
  const sql =
    "SELECT * FROM service WHERE isActive = 1 ORDER BY service_id LIMIT 4";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/services/:sname", (req, res) => {
  const sql = "SELECT * FROM service WHERE service_name = ?";
  const sname = decodeURIComponent(req.params.sname).replace(/-/g, " ");
  // console.log("Fetching service details for name:", sname);
  db.query(sql, [sname], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.get("/api/services_all", (req, res) => {
  const sql = "SELECT * FROM service";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/services", (req, res) => {
  const sql = "SELECT * FROM service WHERE isActive = 1";
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

app.put("/api/services/toggle-active/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE service SET isActive = NOT isActive WHERE service_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    res.json({
      success: true,
      message: "Service status updated successfully.",
    });
  });
});

app.get("/api/contact/responses", (req, res) => {
  const sql = "SELECT * FROM contact";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const service_storage = multer.diskStorage({
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

const service_upload = multer({
  storage: service_storage,
});

app.post("/api/services", service_upload.single("image"), (req, res) => {
  const { service_name, description, full_description } = req.body;
  const isActive = true;
  const date_created = new Date().toISOString().slice(0, 10);

  let image_path = "default_image_path.jpg"; // Default image path if no file is uploaded

  if (req.file) {
    // If a file is uploaded, process the image
    image_path = req.file.filename; // Get the image name from the uploaded file

    try {
      sharp(req.file.path)
        .resize(200, 200)
        .toFile(
          "../services-project-vite/src/assets/images/service/" +
            "thumbnails-" +
            image_path,
          (err, resizeImage) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ error: "An error occurred while resizing the image." });
            } else {
              console.log(resizeImage);
            }
          }
        );
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the image." });
    }
  }

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

const blog_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../services-project-vite/src/assets/images/blog");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const blog_upload = multer({
  storage: blog_storage,
});

app.post("/api/blog", blog_upload.single("image"), (req, res) => {
  const { blog_name, full_description } = req.body;
  const isActive = true;
  const date_created = new Date().toISOString().slice(0, 10);

  let blog_image = "default_image_path.jpg"; // Default image path if no file is uploaded

  if (req.file) {
    // If a file is uploaded, use the file name
    blog_image = req.file.filename;
  }

  const sql =
    "INSERT INTO blog (blog_name, full_description, blog_image, isActive, date_created) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [blog_name, full_description, blog_image, isActive, date_created],
    (err, results) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ error: "An error occurred while inserting the blog." });
      } else {
        res.json({ success: true, message: "Blog added successfully." });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
