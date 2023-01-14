const { Schema, model } = require('mongoose');       //mongoose es todo el objeto asi que nos traemos toda la libreria

// 1: Activo
// 2: Eliminado

const usuarioSchema = new Schema({
    nombre: { type: String},
    correo: { type: String},
    password: { type: String},
    status: { type: Number, default: 1 }
});

module.exports = model('usuarios', usuarioSchema);