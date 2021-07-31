const express = require("express");
const { createProfile, getProfile } = require("../controllers/profile");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/profile", auth, createProfile)
router.get("/profile", auth, getProfile)

module.exports = router;