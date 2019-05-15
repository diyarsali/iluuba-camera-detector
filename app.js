// const express = require("express");
// const mongoose = require("mongoose");
// const config = require("./config/database");
// const bodyParser = require("body-parser");
// const session = require("express-session");
// const passport = require("passport");
// var cookieParser = require("cookie-parser");

// const app = express();

// // db connections
// mongoose.connect(config.database);
// let db = mongoose.connection;
// // check mongoDB connections
// db.once("open", function() {
//   console.log("connecting to mongoBD");
// });
// //check for mongoDb error
// db.on("error", err => {
//   console.log(err);
// });

// // bodyparder midellware
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
// app.use(bodyParser.json());

// // Express session
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: true,
//     saveUninitialized: true
//   })
// );
// app.use(session({ secret: "anything" }));

// app.use(cookieParser());

// // passport config
// require("./config/passport")(passport);
// // passport MiddleWare
// app.use(passport.initialize());
// app.use(passport.session());
// //global variable for logged in
// // app.get("*", (req, res, next) => {
// //   res.locals.user = req.user || null;
// //   next();
// // });

// app.get("/", (req, res) => {
//   res.send("home page");
// });

// let usersRoute = require("./routes/User.js");
// let markerRoute = require("./routes/Marker.js");

// app.use("/users", usersRoute);
// app.use("/marker", markerRoute);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   // res.render("error");
// });

// module.exports = app;

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const passport = require("passport");
const config = require("./config/database");

// db connections
mongoose.connect(config.database);
let db = mongoose.connection;
// Check connection
db.once("open", function() {
  console.log("Connected to MongoDB");
});
// Check for DB errors
db.on("error", function(err) {
  console.log(err);
});

// Init App
const app = express();

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Express Session Middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(session({ secret: "anything" }));

// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// Passport Config
require("./config/passport")(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("*", function(req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.get("/", (req, res) => {
  res.send("home page");
});

// Route Files
let usersRoute = require("./routes/User.js");
let markerRoute = require("./routes/Marker.js");

app.use("/users", usersRoute);
app.use("/marker", markerRoute);

// Start Server
app.listen(3001, function() {
  console.log("Server started on port 3001...");
});
