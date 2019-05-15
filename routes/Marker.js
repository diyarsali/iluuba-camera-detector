const express = require("express");
const router = express.Router();
const Marker = require("../models/markers");
const Passport = require("passport");
const User = require("../models/user");

//add marker
// router.post("/addMarker", (req, res) => {
//   let coords = req.body;
//   let ownerUsername = req.user.username;
//   console.log(coords);
//   let newMArker = new Marker();
//   newMArker.latitude = coords.latitude;
//   newMArker.longitude = coords.longitude;
//   newMArker.owner = ownerUsername;
//   newMArker.save(err => {
//     if (err) {
//       console.log("Error saving marker into mongo");
//       return;
//     }
//     res.send({ markerAdded: true });
//   });
// });

// add marker
router.post("/addMarker", (req, res) => {
  let timeIspased = true;
  var ownerUsername = req.user.username;
  console.log("ownerUsername");
  Marker.find({ owner: ownerUsername }, (err, markers) => {
    if (err) {
      console.log("Failed getting createdAt in markers");
      return;
    }

    var timeOfPost = markers[0].createdAt.getMinutes();
    var timeOfNow = new Date().getMinutes();

    if (timeOfNow - timeOfPost < 10) {
      timeIspased = false;
      console.log("cannot add marker because time is less than 10 minutes");
      // res.send(timeIspased);
      return false;
    }
  })
    .sort({ createdAt: -1 })
    .limit(1);

  setTimeout(() => {
    if (timeIspased) {
      let coords = req.body;
      // let ownerUsername = req.user.username;
      let newMArker = new Marker();
      newMArker.latitude = coords.latitude;
      newMArker.longitude = coords.longitude;
      newMArker.owner = ownerUsername;
      console.log(ownerUsername);
      newMArker.save(err => {
        if (err) {
          console.log("Error saving marker into mongo");
          return;
        }
        res.send({ markerAdded: true });
      });
    } else {
      res.send({ markerAdded: false });
    }
  }, 100);
});

router.get("/allCamera", (req, res) => {
  Marker.find({}, (err, camera) => {
    res.send(camera);
  });
});

// // save some markers
// router.get("/", (req, res) => {
//   let ownerUsername = "diyar";
//   let newMArker = new Marker();
//   newMArker.latitude = 35.566393;
//   newMArker.longitude = 45.374218;
//   newMArker.owner = ownerUsername;
//   newMArker.save(err => {
//     if (err) {
//       console.log("Error saving marker into mongo");
//       return;
//     }
//     res.send({ markerAdded: true });
//   });
// });

router.get("/", (req, res) => {
  // let ownerUsername = req.user.username;
  res.send(req.user.username);
  console.log(req.user.username);
});

// router.get("/addMarker", (req, res) => {
//   let timeIspased = true;
//   var ownerUsername = "diyar";
//   console.log("hatm ");
//   // res.send("hatm");
//   Marker.find({ owner: ownerUsername }, (err, markers) => {
//     if (err) {
//       console.log("Failed getting createdAt in markers");
//       return;
//     }
//     res.send(markers);
//     var timeOfPost = markers[0].createdAt.getMinutes();
//     var timeOfNow = new Date().getMinutes();
//     console.log(timeOfPost);
//     console.log(timeOfNow);

//     if (timeOfNow - timeOfPost < 10) {
//       timeIspased = false;
//       console.log("cannot add marker because time is less than 10 minutes");
//       // res.send(timeIspased);
//       return false;
//     }
//   })
//     .sort({ createdAt: -1 })
//     .limit(1);

//   setTimeout(() => {
//     if (timeIspased) {
//       // let ownerUsername = req.user.username;
//       let newMArker = new Marker();
//       newMArker.latitude = 35.565876;
//       newMArker.longitude = 45.376418;
//       newMArker.owner = ownerUsername;
//       console.log(ownerUsername);
//       newMArker.save(err => {
//         if (err) {
//           console.log("Error saving marker into mongo");
//           return;
//         }
//         console.log(timeIspased);
//       });
//     } else {
//       console.log(timeIspased);
//     }
//   }, 100);
// });

module.exports = router;
