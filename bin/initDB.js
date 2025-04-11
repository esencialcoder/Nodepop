"use strict";

const mongoose = require("mongoose");
const Anuncio = require("../models/Anuncio");
const connectMongoose = require("../lib/connectMongoose");
const fs = require("fs");

async function initDB() {
  // Connect to the database
  await connectMongoose("mongodb://127.0.0.1:27017/nodepop");

  // Delete all existing ads
  await Anuncio.deleteMany();
  console.log("Ads removed");

  // Read the JSON file with the ads
  const anunciosData = JSON.parse(
    fs.readFileSync("./data/anuncios.json", "utf8")
  );

  // Insert the ads into the database
  const result = await Anuncio.insertMany(anunciosData.anuncios);
  console.log("Inserted ads:", result.length);

  // Close the connection
  await mongoose.connection.close();

}

initDB().catch((err) => console.error(err));
