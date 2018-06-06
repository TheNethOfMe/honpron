const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Validation
const getCommentCode = require("../../validation/comment-coding");

// Load Models
const Comment = require("../../models/Comments");
const Entry = require("../../models/Entries");

// @route   POST api/comment
// @desc    adds a comment
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Entry.findById(req.body.entryId)
      .then(entry => {
        if (!req.body.commentText) {
          return res
            .status(401)
            .json({ commentText: "Comment is required to post." });
        }
        console.log("USER", req.user);
        const color =
          req.user.status === "blacklisted"
            ? "black"
            : getCommentCode(req.body.commentText);
        const newComment = {
          author: req.user.userName,
          authorId: req.user.id,
          entry: req.body.entryTitle,
          entryId: req.body.entryId,
          content: req.body.commentText,
          commentCode: color,
          approved: false
        };
        new Comment(newComment)
          .save()
          .then(comment => res.json(comment))
          .catch(err => {
            throw err;
          });
      })
      .catch(err => res.status(404).json({ msg: "Entry not found." }));
  }
);

// @route   GET api/comment/entry/:entry_id
// @desc    gets all comments for an entry that have been approved
// @access  Public
router.get("/entry/:entry_id", (req, res) => {
  Comment.find(
    { $and: [{ entryId: req.params.entry_id }, { approved: true }] },
    { commentCode: 0 }
  )
    .sort({ commentDate: -1 })
    .then(comments => res.json(comments))
    .catch(err => res.status(404).json({ msg: "No comments to display" }));
});

// @route   GET api/comment/user
// @desc    gets all approved comments for a user
// @access  Private
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Comment.find(
      { $and: [{ authorId: req.user.id }, { approved: true }] },
      { commentCode: 0 }
    )
      .sort({ commentDate: -1 })
      .then(comments => res.json(comments))
      .catch(err => res.status(404).json({ msg: "No comments to display" }));
  }
);

// @route   GET api/comment/admin
// @desc    gets all comments that require moderation
// @access  Private (Admin only)
router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const isAdmin = req.user.isAdmin || false;
    if (!isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    } else {
      Comment.find({ approved: false })
        .sort({ commentDate: -1 })
        .then(comments => res.json(comments))
        .catch(err => res.status(404).json({ msg: "No comments to display" }));
    }
  }
);

// @route   POST api/comment/admin/:comment_id
// @desc    approves a comment and increments the entry's comment counter
// @access  Private (admin only)
router.post(
  "/approve/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const isAdmin = req.user.isAdmin || false;
    if (!isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    } else {
      Comment.findByIdAndUpdate(
        req.params.comment_id,
        { $set: { approved: true } },
        { new: true }
      ).then(comment => {
        Entry.findByIdAndUpdate(comment.entryId, { $inc: { comments: 1 } })
          .then(entry => res.json(entry))
          .catch(err => res.status(404).json({ msg: "Couldn't find entry" }));
      });
    }
  }
);

// @route   DELETE api/comment/:id
// @desc    deletes a comment and decrements
// @access  Private (admin or comment auther only)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const isAdmin = req.user.isAdmin || false;
    Comment.findById(req.params.id).then(comment => {
      if (!isAdmin && req.user.id !== comment.authorId) {
        return res.status(401).json({ msg: "Unauthorized" });
      } else {
        const commentEntryId = comment.entryId;
        const wasApproved = comment.approved;
        Comment.findByIdAndRemove(req.params.id, (err, doc) => {
          if (err) {
            res.status(500).json({ err: "An error occured" });
          } else if (!doc) {
            res.status(404).json({ err: "Entry not found." });
          } else {
            if (wasApproved) {
              Entry.findByIdAndUpdate(commentEntryId, {
                $inc: { comments: -1 }
              })
                .then(entry => res.json(entry))
                .catch(err =>
                  res.status(404).json({ msg: "Couldn't find entry" })
                );
            }
          }
        });
      }
    });
  }
);

// @route   DELETE api/comment/entry/:entry_id
// @desc    removes all comments for specific entry
// @access  Private (admin only)
router.delete(
  "/entry/:entry_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const isAdmin = req.user.isAdmin || false;
    if (!isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    } else {
      Comment.deleteMany({ entryId: req.params.entry_id }, err => {
        if (err) {
          res.status(500).json({ err: "An error occured" });
        }
      });
    }
  }
);

// @route   POST api/comment/userDelete
// @desc    changes all the comments a user made to "deleted user"
// @access  Private
router.post(
  "/userDelete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Comment.update(
      { authorId: req.user.id },
      { $set: { author: "Deleted User" } },
      { multi: true }
    ).then(res.status({ msg: "Done" }));
  }
);

module.exports = router;
