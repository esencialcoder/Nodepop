"use strict";

const mongoose = require("mongoose");

const anuncioSchema = mongoose.Schema({
  name: { type: String, required: true, index : true },
  sale: { type: Boolean, required: true, index : true },
  price: { type: Number, required: true, index : true },
  photo: String,
  tags: { type: [String], enum: ["work", "lifestyle", "motor", "mobile"] },
});

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
