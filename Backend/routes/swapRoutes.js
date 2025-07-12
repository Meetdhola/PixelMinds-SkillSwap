const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { sendSwap, getMySwaps, updateStatus } = require("../controllers/swapController");

router.post("/send", authMiddleware, sendSwap);
router.get("/mine", authMiddleware, getMySwaps);
router.put("/:id/status", authMiddleware, updateStatus);

module.exports = router;
