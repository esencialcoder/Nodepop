'use strict';

const connection = require('../../../lib/connectMongoose');
const Anuncio = require('../../../models/Anuncio');

async function main() {
  await connection('mongodb://127.0.0.1:27017/nodepop');

  const anuncio = new Anuncio({
    name: 'iPhone 13',
    sale: true,
    price: 650,
    photo: 'iphone13.png',
    tags: ['mobile', 'lifestyle']
  });

  const saved = await anuncio.save();
  console.log('Anuncio guardado:', saved);

  await require('mongoose').connection.close();
}

main().catch(err => console.error(err));
