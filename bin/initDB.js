'use strict';

const mongoose = require('mongoose');
const Anuncio = require('../models/Anuncio');
const connectMongoose = require('../lib/connectMongoose');
const fs = require('fs');

async function initDB() {
  // Conectar a la base de datos
  await connectMongoose('mongodb://127.0.0.1:27017/nodepop');

  // Borrar todos los anuncios existentes
  await Anuncio.deleteMany();
  console.log('Anuncios eliminados');

  // Leer el archivo JSON con los anuncios
  const anunciosData = JSON.parse(fs.readFileSync('./data/anuncios.json', 'utf8'));
  
  // Insertar los anuncios en la base de datos
  const result = await Anuncio.insertMany(anunciosData.anuncios);
  console.log('Anuncios insertados:', result.length);

  // Cerrar la conexión
  await mongoose.connection.close();
}

initDB().catch(err => console.error(err));
