const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authMiddleware } = require("../middlewares/authMiddleware");

// Get current user's data
// router.get("/me", authMiddleware, async (req, res) => {
//     const user = await User.findById(req.user.id);
//     res.json(user);
// });
router.get("/me", authMiddleware, async (req, res) => {
   try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// Get all public users
router.get("/public", async (req, res) => {
    const users = await User.find({ isProfilePublic: true });
    res.json(users);
});

module.exports = router;
