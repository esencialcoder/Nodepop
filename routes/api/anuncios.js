"use strict";

const express = require("express");
const router = express.Router();
const Anuncio = require("../../models/Anuncio");
const { body, validationResult } = require('express-validator');


// GET to list ads with filters
router.get("/", async (req, res, next) => {
  try {
    const filters = {};

    // Filter by tag
    if (req.query.tag) {
      filters.tags = req.query.tag;
    }

    // Filter by ad type (sale/search)
    if (req.query.sale) {
      filters.sale = req.query.sale === "true"; // true o false
    }

    // Filter by price (min-max range)
    if (req.query.price) {
      const [minPrice, maxPrice] = req.query.price.split("-");

      if (minPrice) {
        filters.price = { ...filters.price, $gte: Number(minPrice) };
      }

      if (maxPrice) {
        filters.price = { ...filters.price, $lte: Number(maxPrice) };
      }
    }

    // Filter by article name (search for items starting with the given text)
    if (req.query.name) {
      filters.name = new RegExp("^" + req.query.name, "i");
    }

    // Pagination and sorting
    const start = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "name";

    // Get ads by applying filters, pagination, and sorting
    const anuncios = await Anuncio.find(filters)
      .skip(start)
      .limit(limit)
      .sort(sort);

    res.json(anuncios);
  } catch (err) {
    next(err);
  }
});

const validateAd = [
  body('name')
    .notEmpty().withMessage('Name is required'),

  body('sale')
    .isBoolean().withMessage('Sale must be a boolean (true or false)'),

  body('price')
    .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),

  body('photo')
    .optional().isString().withMessage('Photo must be a string'),

    body('tags')
    .customSanitizer((value) => {
      // Convierte string a array si es necesario
      if (typeof value === 'string') {
        return [value];
      }
      return value;
    })
    .isArray().withMessage('Tags must be an array')
    .custom((tags) => {
      const allowed = ['work', 'lifestyle', 'motor', 'mobile'];
      const invalidTags = tags.filter(tag => !allowed.includes(tag));
      if (invalidTags.length > 0) {
        throw new Error(`Invalid tags: ${invalidTags.join(', ')}`);
      }
      return true;
    })
  
];

// POST route to create a new ad
router.post('/', validateAd, async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, sale, price, photo, tags } = req.body;

    const nuevoAnuncio = new Anuncio({ name, sale, price, photo, tags });
    const savedAd = await nuevoAnuncio.save();

    res.status(201).json(savedAd);
  } catch (err) {
    next(err);
  }
});



module.exports = router;
