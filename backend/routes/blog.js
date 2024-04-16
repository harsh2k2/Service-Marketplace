import multer from "multer";
import path from "path";
import sharp from "sharp";
import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/api/blog/:bname", (req, res) => {
  const sql = "SELECT * FROM blog WHERE blog_name = ?";
  const bname = decodeURIComponent(req.params.bname).replace(/-/g, " ");

  db.query(sql, [bname], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
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

router.post("/api/blog", blog_upload.single("image"), (req, res) => {
  const { blog_name, full_description } = req.body;
  const isActive = true;
  const date_created = new Date().toISOString().slice(0, 10);

  let blog_image = "default_blog_image.jpg"; // Default image path if no file is uploaded

  if (req.file) {
    // If a file is uploaded, process the image
    blog_image = req.file.filename; // Get the image name from the uploaded file

    try {
      sharp(req.file.path)
        .resize(200, 200)
        .toFile(
          "../services-project-vite/src/assets/images/service/" +
            "thumbnails-" +
            blog_image,
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

export default router;
