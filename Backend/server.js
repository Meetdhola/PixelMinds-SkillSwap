const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const swapRoutes = require("./routes/swapRoutes");
const { authMiddleware } = require("./middlewares/authMiddleware");

const app = express();
// app.use(cors()); // Allow all origins for testing
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/", (req, res) => res.send("Backend working ✅"));

app.use("/api/user", authMiddleware, userRoutes);
app.use("/api/swap", authMiddleware, swapRoutes);

// DON'T apply it to /api/auth
app.use("/api/auth", authRoutes);
// filepath: /Users/meetdhola/Downloads/OdooHackathon/Backend/server.js
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found", path: req.path });
});


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");
        app.listen(5050, () => console.log("🚀 Backend started on http://localhost:5050"));
    })
    .catch((err) => console.error("❌ MongoDB connection failed:", err));
