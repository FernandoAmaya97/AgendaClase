const jwt = require('jsonwebtoken');
const modelo = require('./../models/usuario');
require('dotenv').config();
const crypto = require('crypto');

function hashPassword(pwd) {
    return crypto.scryptSync(pwd, 'salt', 24);
}

module.exports = {
    login: (req, res) => {
        const data = req.body;

        const credenciales = {
            correo: data.correo,
            password: hashPassword(data.password) //aqui estamos utilizando el hash de el password que ingresa para loguearse
        }

        modelo.findOne(credenciales).then(response => {
            if(response){
                const {_id, nombre, correo } = response;
                const token = jwt.sign({_id, nombre, correo}, process.env.SECRET);
                res.send({token, nombre, correo});
            }else {
                res.sendStatus(401);
            }
        }).catch(err => {
            res.sendStatus(400);
        });
    },

    registro: (req, res) => {
        const datos = req.body;
        const hashedPassword = hashPassword(datos.password);
        datos.password = hashedPassword; // con esta linea estamos pasandole el hasshed ya convertiddo del texto recibido en el body

        modelo.create(datos).then(response => {
            delete response.password;
            const {_id, nombre, correo} = response;
            res.send({_id, nombre, correo});
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    }
}