const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("validator");
const isEmpty = require("../../validation/is-empty");
const keys = require("../../config/keys");
const passport = require("passport");

// Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateEmailChange = require("../../validation/email-change");

// Load database models
const User = require("../../models/User");
const Entry = require("../../models/Entries");

// @route   POST api/users/register
// @desc    registers new user
// @access  Public
router.post("/register", (req, res) => {
  validateRegisterInput(req.body, true).then(result => {
    const { errors, isValid } = result;
    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        status: "normal"
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          } else {
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          }
        });
      });
    }
  });
});

// @route   POST api/users/admin
// @desc    register a new admin account
// @access  Public (for now)
router.post("/admin", (req, res) => {
  validateRegisterInput(req.body, false).then(result => {
    const { errors, isValid } = result;
    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const newAdmin = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        isAdmin: true,
        status: "Admin"
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) {
            throw err;
          } else {
            newAdmin.password = hash;
            newAdmin
              .save()
              .then(admin => res.json(admin))
              .catch(err => console.log(err));
          }
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    login user / return jwt token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userName = req.body.userName;
  const password = req.body.password;

  User.findOne({ userName }).then(user => {
    if (!user) {
      errors.alert = "Username or password is incorrect.";
      return res.status(404).json(errors);
    } else if (user.status === "banned") {
      errors.alert = "This account has been banned.";
      return res.status(401).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          userName: user.userName
        };
        const blockList = user.blocked;
        if (user.isAdmin) {
          payload.isAdmin = user.isAdmin;
        }
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              blockList
            });
          }
        );
      } else {
        errors.alert = "Username or password is incorrect.";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   POST api/users/email
// @desc    allows user to change their email
// @access  Private (same user only)
router.post(
  "/email",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    validateEmailChange(req.body, req.user.userName).then(result => {
      const { isValid, errors } = result;
      if (!isValid) {
        return res.status(400).json(errors);
      } else {
        const email = req.body.email;
        const email2 = req.body.email2;
        const oldEmail = req.body.oldEmail;
        User.findOneAndUpdate(
          { userName: req.user.userName },
          { $set: { email } },
          { new: true }
        )
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            return res.status(400).json({ msg: "Something went wrong." });
          });
      }
    });
  }
);

// @route   GET api/users/modify/
// @desc    allows admin to get a list of all users
// @access  Private (admin only)
router.get(
  "/modify",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const isAdmin = req.user.isAdmin || false;
    if (!isAdmin) {
      return res.status(401).json({ msg: "Unauthorized" });
    } else {
      User.find({}, "userName email isAdmin status").then(users => {
        return res.json(users);
      });
    }
  }
);

// @route   POST api/users/modify/:id
// @desc    allows admin to put blacklist or banned status on users
// @access  Private (admin only)
router.post(
  "/modify/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const isAdmin = req.user.isAdmin || false;
    const status = req.body.status;
    if (!isAdmin) return res.status(401).json({ msg: "Unauthorized" });
    User.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    ).then(user => {
      return res.json(user);
    });
  }
);

// @route   POST api/users/block
// @desc    lets user block another user
// @access  Private
router.post(
  "/block",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const blockUser = req.body.blockUser;
    User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { blocked: blockUser } },
      { new: true }
    )
      .then(user => {
        const data = user.blocked;
        return res.json(data);
      })
      .catch(err => console.log(err));
  }
);

// @route   POST api/users/unblock
// @desc    lets user unblock a blocked user
// @access  Private
router.post(
  "/unblock",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const unblockUser = req.body.unblockUser;
    User.findByIdAndUpdate(req.user._id, { $pull: { blocked: unblockUser } })
      .then(user => {
        const data = user.blocked;
        return res.json(data);
      })
      .catch(err => console.log(err));
  }
);

// @route   GET api/users/blocklist
// @desc    gets a user's blocklist
// @access  Private
router.get(
  "/blocklist",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user._id, { blocked: 1 })
      .then(data => {
        return res.json(data.blocked);
      })
      .catch(err => console.log(err));
  }
);

// @route   DELETE api/users/
// @desc    deletes a user's account
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findByIdAndRemove(req.user._id).then(res.json({ msg: "Deleted" }));
  }
);

module.exports = router;
