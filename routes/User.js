const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Passport = require("passport");

// SIGNUP
router.post("/signup", (req, res) => {
  let data = req.body;
  let usernameAvailable = true;
  User.find({}, "username", (err, user) => {
    if (err) {
      console.log("Failed getting user in signin");
      return;
    }
    for (let i = 0; i < user.length; i++) {
      if (user[i].username == data.username) {
        usernameAvailable = false;
        console.log("avialable username");
        return false;
      }
    }
  });
  setTimeout(() => {
    if (usernameAvailable) {
      let newUser = new User();
      newUser.username = data.username;
      newUser.password = data.password;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.log("Failed generating salt bcrypt");
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save(err => {
            if (err) {
              console.log("Error saving user into mongo");
              return;
            }
            res.send({ userRegistered: true, usedUsername: false });
          });
        });
      });
    } else {
      res.send({ userRegistered: false, usedUsername: true });
    }
  }, 100);
});

//Login Post
router.post(
  "/login",
  Passport.authenticate("local", { session: true }),
  (req, res, next) => {
    res.send({ login: true });
    // console.log(req.user);
  }
);

// test route for ensuer user is login

router.get("/ensureAuthenticated", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send({ ensureAuthenticated: true, Loading: false });
    return next();
  } else {
    res.send({ ensureAuthenticated: false });
  }
});

//
//logout post
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("logout");
  console.log("logout bu ");
});

router.post("/test", (req, res) => {
  console.log(req.body);
  res.send("helllow from backend");
});

// router.get("/", (req, res) => {
//   let newUser = new User();
//   newUser.username = "hama";
//   newUser.password = "hama";
//   newUser.save(err => {
//     if (err) {
//       console.log("Error saving user into mongo");
//       return;
//     }
//     res.send({ userRegistered: true, usedUsername: false });
//   });
// });
module.exports = router;
