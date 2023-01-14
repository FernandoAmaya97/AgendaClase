// ESTE ARCHIVO ES EL CONTROLADOR DE CONTACTOS
const contacto = require('./../models/contacto');
const jwt = require('jsonwebtoken');

module.exports = {      //lo b¿vamos a trabajar como objeto
    getAll: (req, res) => {     //recibe el request y el response
        
            contacto.find({status: 1, userId: req.user._id}) // esto es u n and que esten activos y que pertenezcan al id de dicho usuario
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(400).send('algo salió mal');
            });
    },
    get: (req, res) => {
        const id = req.params.id;
        contacto.find({status: 1, _id: id, userId: req.user._id})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send('algo salió mal');
        });

    },
    crear: (req, res) =>{
        let data = req.body;

        data.userId =req.user._id

        contacto.create(data).then(response => {
            res.send(response);
        }); 
    }
}

//find, findOne, findBiId, create, save
// TAREA
/*
save sirve para hacer cambios y guardarlos,
completar los endpoints que hacen falta
-retornar todos los registros hechos, (pasandole ciertos parametros)
-retornar el detalle de un solo registro con findOne
-crear un nuevo registro
-actualizar un nuevo registro
-cambiar el status de un registro, es decir eliminarlo,
*/

