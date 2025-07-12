const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');

router.post("/login", authController.login);
router.post('/signup', authController.signup); // Should NOT have any auth middleware here

module.exports = router;
