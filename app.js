var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require('dotenv').config();


const connectMongoose = require("./lib/connectMongoose");
const mongoUri = process.env.MONGODB_URI;


connectMongoose(mongoUri).catch(err => {
  console.error("Database connection error:", err);
});


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("x-powered-by", false);


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/** API Routes */
app.use("/api/anuncios", require("./routes/api/anuncios"));

/** Website Routes */
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res,) { // <-- next never used 
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
