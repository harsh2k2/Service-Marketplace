import express from "express";
import cors from "cors";
import { db } from "./db.js";

import servicesRoutes from "./routes/services.js";
import blogRoutes from "./routes/blog.js";
import contactRoutes from "./routes/contact.js";

const app = express();
const port = 8800;

app.use(express.static("public"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the imported routes
app.use(servicesRoutes);
app.use(blogRoutes);
app.use(contactRoutes);

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
