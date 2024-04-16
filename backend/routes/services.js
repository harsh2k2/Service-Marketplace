import express from "express";
import { db } from "../db.js";
import multer from "multer";
import path from "path";
import sharp from "sharp";

const router = express.Router();

router.get("/api/services/firstfour", (req, res) => {
  const sql =
    "SELECT * FROM service WHERE isActive = 1 ORDER BY service_id LIMIT 4";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// router.get("/api/services/:id", (req, res) => {
//   const sql = "SELECT * FROM service WHERE service_id = ?";
//   const id = req.params.id;
//   db.query(sql, [id], (err, results) => {
//     if (err) throw err;
//     res.json(results[0]);
//   });
// });

router.get("/api/services/firstfour", (req, res) => {
  const sql =
    "SELECT * FROM service WHERE isActive = 1 ORDER BY service_id LIMIT 4";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get("/api/services/:sname", (req, res) => {
  const sql = "SELECT * FROM service WHERE service_name = ?";
  const sname = decodeURIComponent(req.params.sname).replace(/-/g, " ");
  // console.log("Fetching service details for name:", sname);
  db.query(sql, [sname], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

router.get("/api/services_all", (req, res) => {
  const sql = "SELECT * FROM service";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get("/api/services", (req, res) => {
  const sql = "SELECT * FROM service WHERE isActive = 1";
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

router.post("/api/services", service_upload.single("image"), (req, res) => {
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

router.put("/api/services/toggle-active/:id", (req, res) => {
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

export default router;
