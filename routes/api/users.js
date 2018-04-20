const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "That email is already registered.";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
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

// @route   POST api/users/login
// @desc    login user / return jwt token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name };
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

// @route   POST api/users/newAdmin
// @desc    register a new admin account
// @access  Public (for now)
router.post("/newAdmin", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "This email is already registered.";
      return res.status(400).json(errors);
    } else {
      const newAdmin = new User({
        name: req.body.name,
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

// @route   POST api/users/admin
// @desc    login admin
// @access  Public
router.post("/admin", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.password = "Email or Password Incorrect.";
      res.status(401).json(errors);
    }
    const isAdmin = user.isAdmin || false;
    if (!isAdmin) {
      errors.password = "Unauthorized";
      res.status(401).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, isAdmin: user.isAdmin };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 10800 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "Email or Password Incorrect.";
        res.status(401).json(errors);
      }
    });
  });
});

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
