const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Input Validation
const validateSeriesInput = require("../../validation/series");

// Load Entry Model
const Series = require("../../models/Series");

// @route   GET api/series/
// @desc    gets all series
// @access  Public
router.get("/", (req, res) => {
  const errors = {};
  let query = {};
  if (req.query) query = req.query;
  Series.find(query).then(series => {
    if (series.length === 0) {
      errors.series = "No series found";
      res.status(404).json(errors);
    } else {
      res.json(series);
    }
  });
});

// @route   POST api/series/create
// @desc    adds a series
// @access  Private Admin-Only
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSeriesInput(req.body);
    const isAdmin = req.user.isAdmin || false;
    if (!isAdmin) {
      return res.status(401).json({ alert: "Unauthorized" });
    }
    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const newSeries = new Series({
        seriesType: req.body.seriesType,
        seriesName: req.body.seriesName,
        seriesDesc: req.body.seriesDesc
      });
      newSeries
        .save()
        .then(series => res.json(series))
        .catch(err => console.log(err));
    }
  }
);

module.exports = router;
