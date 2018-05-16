const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Validation
const validateMessageInput = require("../../validation/message");
const canReadMessage = require("../../validation/can-read-message");

// Load Models
const Message = require("../../models/Messages");
const User = require("../../models/User");

// @route   GET api/messages/
// @desc    get all messages
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const self = req.user.id;
    Message.find({
      $or: [
        { authorId: self, authorDelete: false },
        { recipientId: self, recipientDelete: false }
      ]
    })
      .sort({ date: -1 })
      .then(messages => res.json(messages))
      .catch(err => res.status(404).json({ msg: "No messages to display." }));
  }
);

// @route   POST api/messages/
// @desc    create a message
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    validateMessageInput(req.body).then(result => {
      const { errors, isValid, recipientId } = result;
      if (!isValid) {
        return res.status(400).json(errors);
      } else {
        const newMessage = {
          author: req.user.userName,
          authorId: req.user.id,
          recipient: req.body.recipient,
          recipientId,
          subject: req.body.subject || "(No Subject)",
          body: req.body.body
        };
        new Message(newMessage)
          .save()
          .then(message => res.send(message))
          .catch(err => {
            throw err;
          });
      }
    });
  }
);

// @route   POST api/messages/:id
// @desc    adds delete property and deletes message if author and sender have deleted
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let updates = {};
    if (req.body.authorDelete) updates.authorDelete = true;
    if (req.body.recipientDelete) updates.recipientDelete = true;
    Message.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true })
      .then(msg => {
        if (msg.authorDelete && msg.recipientDelete) {
          Message.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) {
              res.status(500).json({ msg: "An error occured" });
            } else {
              res.json({ msg: "Deletion successful" });
            }
          });
        } else {
          res.json({ msg: "Updated" });
        }
      })
      .catch(err => {
        res.status(500).json({ msg: "Something went wrong" });
      });
  }
);

// @route   GET api/messages/:id
// @desc    gets one message and adds read property if it's unread
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Message.findById(req.params.id)
      .then(message => {
        const self = req.user.id;
        const denyAccess = canReadMessage(message, self);
        if (denyAccess) {
          return res.status(401).json({ msg: "Access Denied" });
        }
        if (message.recipientId === self && message.read === false) {
          Message.findByIdAndUpdate(
            req.params.id,
            { $set: { read: true } },
            { new: true }
          ).then(msg => res.json(msg));
        } else {
          res.json(message);
        }
      })
      .catch(err => res.status(404).json({ msg: "Message not found" }));
  }
);

module.exports = router;
