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

// Load database models
const User = require("../../models/User");

// @route   POST api/users/register
// @desc    registers new user
// @access  Public
router.post("/register", (req, res) => {
  validateRegisterInput(req.body).then(result => {
    const { errors, isValid } = result;
    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
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
  validateRegisterInput(req.body).then(result => {
    const { errors, isValid } = result;
    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const newAdmin = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        isAdmin: true
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
      errors.userName = "User not found";
      return res.status(404).json(errors);
    } else if (user.banned) {
      errors.userName = "This account has been banned.";
      return res.status(401).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name };
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
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
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
    const email = req.body.email;
    const oldEmail = req.body.oldEmail;
    if (req.user.email !== oldEmail) {
      return res
        .status(401)
        .json({ oldEmail: "Old Email couldn't be verified." });
    } else if (isEmpty(email) || !Validator.isEmail(email)) {
      return res.status(400).json({ email: "Email field is not valid." });
    } else {
      User.findOneAndUpdate(
        { userName: req.user.userName },
        { $set: { email } },
        { new: true }
      )
        .then(user => {
          res.json(user);
        })
        .catch(err => {
          console.log(err);
        });
    }
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
      User.find({}, "userName email isAdmin banned blackListed").then(users => {
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
    const banned = req.body.banned || false;
    const blackListed = req.body.blackListed || false;
    let changes = {};
    if (!isAdmin) return res.status(401).json({ msg: "Unauthorized" });
    if (banned) changes.banned = true;
    if (blackListed) changes.blackListed = true;
    User.findByIdAndUpdate(
      req.params.id,
      { $set: changes },
      { new: true }
    ).then(user => {
      return res.json(user);
    });
  }
);

// @route   GET api/users/current
// @desc    return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      isAdmin: req.user.isAdmin || "User is NOT admin"
    });
  }
);

module.exports = router;
