"use strict";

const express = require("express");
const router = express.Router();
const Anuncio = require("../../models/Anuncio");

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

// POST route to create a new ad
router.post('/', async (req, res, next) => {
  try {
    const { name, sale, price, photo, tags } = req.body;

    // Validate data
    if (!name || !sale || !price || !tags) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create the new ad
    const nuevoAnuncio = new Anuncio({ name, sale, price, photo, tags });

    // Save to the database
    const savedAd = await nuevoAnuncio.save();
    res.status(201).json(savedAd);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
