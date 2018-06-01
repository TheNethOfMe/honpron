const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Validation
const validateMessageInput = require("../../validation/message");
const canReadMessage = require("../../validation/can-read-message");
const getCommentCode = require("../../validation/comment-coding");

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

// @route   GET api/messages/admin
// @desc    get all admin messages
// @access  Private (Admin only)
router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const isAdmin = req.user.isAdmin || false;
    if (!isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    } else {
      Message.find({
        $or: [
          { authorId: "Admin", authorDelete: false },
          { recipientId: "Admin", recipientDelete: false }
        ]
      })
        .sort({ date: -1 })
        .then(messages => res.json(messages))
        .catch(err => res.status(404).json({ msg: "No messages to display." }));
    }
  }
);

// @route   POST api/messages
// @desc    create a message
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    validateMessageInput(req.body, req.user.id).then(result => {
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

// @route   POST api/messages/admin
// @desc    creates a message for admin
// @access  Private
router.post(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    if (!req.body.body) {
      errors.body = "You must have a message to send.";
      return res.status(400).json(errors);
    } else {
      const color =
        req.user.status === "blacklisted"
          ? "black"
          : getCommentCode(req.body.body);
      const newMessage = {
        author: req.user.userName,
        authorId: req.user.id,
        recipient: "Admin",
        recipientId: "Admin",
        subject: req.body.subject || "(No Subject)",
        topic: req.body.topic || "(No Topic)",
        code: color,
        body: req.body.body
      };
      new Message(newMessage)
        .save()
        .then(message => res.send(message))
        .catch(err => {
          throw err;
        });
    }
  }
);

// @route   POST api/messages/delete/:id
// @desc    adds delete property and deletes message if author and sender have deleted
// @access  Private
router.post(
  "/delete/:id",
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

// @route   GET api/messages/read/:id
// @desc    gets one message and adds read property if it's unread
// @access  Private
router.get(
  "/read/:id",
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
