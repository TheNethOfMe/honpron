const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Input Validation
const validateEntryInput = require("../../validation/entry");
const getEntryFields = require("../../validation/entry-fields");

// Load Entry Model
const Entry = require("../../models/Entries");
const Series = require("../../models/Series");

// @route   GET api/entries/test
// @desc    tests entries route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Entries Works!" }));

// @route   GET api/entries/
// @desc    fetch all entries
// @access  Public
router.get("/", (req, res) => {
  const errors = {};
  Entry.find().then(entries => {
    if (entries.length === 0) {
      errors.entries = "No entries to display";
      res.status(404).json(errors);
    } else {
      res.json(entries);
    }
  });
});

// @route   POST api/entries/create
// @desc    create an entries
// @access  Private Admin-only
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    validateEntryInput(req.body).then(result => {
      const { errors, isValid } = result;
      const isAdmin = req.user.isAdmin || false;
      if (!isAdmin) {
        return res.status(401).json({ msg: "Unauthorized" });
      } else if (!isValid) {
        return res.status(400).json(errors);
      } else {
        const entryFields = getEntryFields(req.body);
        new Entry(entryFields)
          .save()
          .then(entry => res.json(entry))
          .catch(err => {
            throw err;
          });
      }
    });
  }
);

module.exports = router;
