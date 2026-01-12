require("dotenv").config(); // Must be top
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("MONGO URI =", process.env.MONGODB_URI); // DEBUG: confirm env loaded

const app = express();
app.use(cors());
app.use(express.json());

/* ---------- MONGODB CONNECTION ---------- */
mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => console.log("MONGODB CONNECTED"))
  .catch((err) => {
    console.error("MONGODB ERROR:", err.message);
    process.exit(1);
  });

/* ---------- SCHEMA ---------- */
const ApplicationSchema = new mongoose.Schema(
  {
    data: { type: Object, required: true }
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", ApplicationSchema);

/* ---------- API ROUTES ---------- */

// POST application
app.post("/api/apply", async (req, res) => {
  try {
    await Application.create({ data: req.body });
    res.status(201).json({ message: "Saved Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error Saving Data" });
  }
});

// GET test route
app.get("/", (req, res) => {
  res.send("Backend running & MongoDB connected");
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
