"user strict";

const Anuncio = require("../models/Anuncio");
const connection = require("../lib/connectMongoose");

main().catch((err) => console.log("Hubo un error", err));

async function main() {
  // inicializar la colección de anuncioSchema
  await initAnuncios();
  connection.close();
}

async function initAnuncios() {
  // borrar todos los anuncios existentes
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios`, deleted);

  // definir los anuncios que deben estar siempre presentes
  const anunciosData = [
    { nombre: 'iPhone 13', venta: true, precio: 650, foto: 'iphone13.png', tags: ['mobile', 'lifestyle'] },
    { nombre: 'Samsung Galaxy S21', venta: true, precio: 750, foto: 's21.png', tags: ['mobile', 'electronics'] }
  ];

  // Insertar los anuncios en la base de datos
  const inserted = await Anuncio.insertMany(anunciosData);
  console.log(`Creados ${inserted.length} anuncios`);
}
