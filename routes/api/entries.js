const express = require("express");
const router = express.Router();

// @route   GET api/entries/test
// @desc    tests entries route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Entries Works!" }));

module.exports = router;
