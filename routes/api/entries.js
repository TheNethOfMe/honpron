const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Entry Model
const Entry = require("../../models/Entries");

// @route   GET api/entries/test
// @desc    tests entries route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Entries Works!" }));

module.exports = router;
