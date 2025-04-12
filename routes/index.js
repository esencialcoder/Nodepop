'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../models/Anuncio');

// GET to the home page
router.get('/', async (req, res, next) => {
  try {
    const { tag, name, price, sale, start = 0, limit = 3 } = req.query;

    const filters = {};

    if (tag) {
      filters.tags = tag;
    }

    if (name) {
      filters.name = new RegExp('^' + name, 'i');
    }

    if (price) {
      const [minPrice, maxPrice] = price.split('-');
      if (minPrice) {
        filters.price = { ...filters.price, $gte: Number(minPrice) };
      }
      if (maxPrice) {
        filters.price = { ...filters.price, $lte: Number(maxPrice) };
      }
    }

    if (sale) {
      filters.sale = sale === 'true';
    }

    const anuncios = await Anuncio.find(filters)
      .skip(Number(start))
      .limit(Number(limit));

    res.render('index', {
      anuncios,
      tag,
      name,
      price,
      sale,
      start: Number(start),
      limit: Number(limit)
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
