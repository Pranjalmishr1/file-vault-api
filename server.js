const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const fileRoutes = require("./routes/fileRoutes");

const app = express();

/*
=========================
Middleware
=========================
*/

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Serve uploaded files publicly
app.use("/uploads", express.static("uploads"));

/*
=========================
Routes
=========================
*/

// Root route (health check route)
app.get("/", (req, res) => {
  res.status(200).send("🚀 File Vault API is running successfully");
});

// File routes
app.use("/files", fileRoutes);

/*
=========================
Database Connection
=========================
*/

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  });

/*
=========================
Server Start
=========================
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});