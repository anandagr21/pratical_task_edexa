const express = require("express");
const { createProfile } = require("../controllers/profile");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/profile", auth, createProfile)

module.exports = router;