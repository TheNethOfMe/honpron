const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Validation
const getCommentCode = require("../../validation/comment-coding");

// Load Models
const Ticket = require("../../models/Tickets");

// @route   GET api/tickets/
// @desc    get all admin messages
// @access  Private (Admin only)
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const isAdmin = req.user.isAdmin || false;
    if (!isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    } else {
      Ticket.find()
        .sort({ date: -1 })
        .then(tickets => {
          res.json(tickets);
        })
        .catch(err => res.status(404).json({ msg: "No tickets to display" }));
    }
  }
);

// @route   POST api/tickets/
// @desc    create a new admin message
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    if (!req.body.ticketText) {
      errors.ticketText = "You must write a message to send.";
      return res.status(400).json(errors);
    } else {
      const color =
        req.user.status === "blacklisted"
          ? "black"
          : getCommentCode(req.body.ticketText);
      const newTicket = {
        sender: req.user.userName,
        senderId: req.user.id,
        subject: req.body.subject,
        topic: req.body.topic || "(No Topic)",
        ticketText: req.body.ticketText,
        colorCode: color
      };
      new Ticket(newTicket)
        .save()
        .then(ticket => res.send(ticket))
        .catch(err => {
          throw err;
        });
    }
  }
);

// @route   GET api/tickets/read/:id
// @desc    read one ticket
// @access  Private (Admin only)
router.get(
  "/read/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const isAdmin = req.user.isAdmin || false;
    if (!isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    } else {
      Ticket.findById(req.params.id)
        .then(ticket => res.json(ticket))
        .catch(err => res.status(404).json({ msg: "Ticket not found." }));
    }
  }
);

// @route  POST api/tickets/update/:id
// @desc   update an admin message (respond, close)
// @access Private (Admin only)
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let updates = {};
    const isAdmin = req.user.isAdmin || false;
    if (!isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    } else {
      if (req.body.responseText) updates.responseText = req.body.responseText;
      if (req.body.closed) updates.closed = req.body.closed;
      Ticket.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true })
        .then(ticket => res.json(ticket))
        .catch(err => res.status(404).json({ msg: "Ticket not found." }));
    }
  }
);

// @route  DELETE api/tickets/delete/:id
// @desc   deletes a ticket
// @access Private (Admin only)
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const isAdmin = req.user.isAdmin || false;
    if (!isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    } else {
      Ticket.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) res.status(500).json({ msg: "An error occured" });
        else {
          res.json({ msg: "Ticket was deleted" });
        }
      });
    }
  }
);

module.exports = router;
