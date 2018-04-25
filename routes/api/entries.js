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

// @route   GET api/entries/
// @desc    get all entries
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

// @route   GET api/entries/:id
// @desc    get one entry
// @access  Public
router.get("/:id", (req, res) => {
  Entry.findById(req.params.id)
    .then(entry => {
      if (!entry) {
        res.status(404).json({ msg: "Entry Not Found" });
      }
      res.send(entry);
    })
    .catch(err => res.status(500).json({ error: err }));
});

// @route   POST api/entries/create
// @desc    create an entry
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

// @route   POST api/entries/:id
// @desc    update one entry
// @access  Private (admin only)
router.post(
  "/:id",
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
        Entry.findByIdAndUpdate(
          req.params.id,
          { $set: entryFields },
          { new: true }
        ).then(entry => res.json(entry));
      }
    });
  }
);

// @route   DELETE api/entries/:id
// @desc    delete one entry
// @access  Private (admin only)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const isAdmin = req.user.isAdmin || false;
    if (!isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    } else {
      Entry.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) {
          res.status(500).json({ err: "An error occured" });
        } else if (!doc) {
          res.status(404).json({ err: "Entry not found." });
        } else {
          res.json({ delete: "Successful" });
        }
      });
    }
  }
);

module.exports = router;
