// AQUI CREAMOS EL MODELO DEL CONTACTO
// el modelo tendrá 2 funciones: definir la estructura y exportar el modelo de mongoose para esta coleccion en especifico

const { Schema, model } = require('mongoose');       //mongoose es todo el objeto asi que nos traemos toda la libreria

// 1: Activo
// 2: Eliminado

const contactoSchema = new Schema({
    nombre: { type: String },
    correo: { type: String },
    telefono: { type: String, default: '0' },
    status: { type: Number, default: 1 },
    userId: {type: String}
});

module.exports = model('contactos', contactoSchema); //aqui le ponemos el nombre de la tabla de mongodb