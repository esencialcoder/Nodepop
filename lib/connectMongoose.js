"use strict";

const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
  console.log("Error de conexión a MongoDB:", err);
});

mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB en", mongoose.connection.name);
});

async function connectMongoose(uri) {
  await mongoose.connect(uri);
}

module.exports = connectMongoose;
