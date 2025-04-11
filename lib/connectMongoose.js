"use strict";

const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB:", err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB on", mongoose.connection.name);
});

async function connectMongoose(uri) {
  await mongoose.connect(uri);
}

module.exports = connectMongoose;
