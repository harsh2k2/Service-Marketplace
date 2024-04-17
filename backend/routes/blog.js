import multer from "multer";
import path from "path";
import sharp from "sharp";
import express from "express";
import { db } from "../db.js";
import slugify from "slugify";

const router = express.Router();

router.get("/api/blog", (req, res) => {
  const sql = "SELECT * FROM blog WHERE isActive = 1";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get("/api/blog_all", (req, res) => {
  const sql = "SELECT * FROM blog";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// router.get("/api/blog/:bname", (req, res) => {
//   const sql = "SELECT * FROM blog WHERE blog_name = ?";
//   // const bname = decodeURIComponent(req.params.bname).replace(/-/g, " ");
//   const bname = req.params.bname;

//   db.query(sql, [bname], (err, results) => {
//     if (err) throw err;
//     res.json(results[0]);
//   });
// });

// router.get("/api/blog/:slug", (req, res) => {
//   const slug = req.params.slug;
//   const sql = "SELECT * FROM blog WHERE slug = ?";
//   db.query(sql, [slug], (err, results) => {
//     if (err) throw err;
//     res.json(results[0]);
//   });
// });

router.get("/api/blog/:slug", (req, res) => {
  const slug = req.params.slug;
  const sql = "SELECT * FROM blog WHERE slug = ?";
  db.query(sql, [slug], (err, results) => {
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

router.put("/api/blog/toggle-active/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE blog SET isActive = NOT isActive WHERE blog_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the blog status." });
    }
    res.json({
      success: true,
      message: "Blog status updated successfully.",
    });
  });
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

  // First, insert the blog post without the slug
  const sqlInsert =
    "INSERT INTO blog (blog_name, blog_image, full_description, isActive, date_created) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [blog_name, blog_image, full_description, isActive, date_created],
    (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ error: "An error occurred while inserting the blog." });
      }

      // Get the blog_id from the inserted row
      const blog_id = results.insertId;

      // Generate the slug with the blog_id
      const slug =
        slugify(blog_name, {
          lower: true, // Convert to lowercase
          strict: true, // Remove special characters
        }) +
        "-" +
        blog_id;

      const sqlUpdate = "UPDATE blog SET slug = ? WHERE blog_id = ?";
      db.query(sqlUpdate, [slug, blog_id], (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "An error occurred while updating the blog slug." });
        }

        res.json({ success: true, message: "Blog added successfully." });
      });
    }
  );
});

export default router;