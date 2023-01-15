//Quien maneja las rutas en express es router
const router = require('express').Router();  //nos traemos solo Router y no todo express
const multer = require('multer');

const authMiddleware = require('../middlewares/auth');
const contactosController = require('./../controllers/contactos'); // nos traemos el contorlador 
const usuariosController = require('./../controllers/usuarios');

const storage = {
    destination: (req, file, callback) => {
        callback(null, 'uploads'); //error-first callback
    },
    filename: (req, file, callback) => {
        const extension = file.originalname.split('.').pop();
        //let nombre = req.user._id + '-' + new Date().getTime() + '.' + extension;
        const nombre = `${req.user._id}-${new Date().getTime()}.${extension}`;
        callback(null, nombre);
    }
};

const multerStorage = multer.diskStorage(storage);

const upload = multer({ storage: multerStorage });

// cconstactos
router.use('/contactos', authMiddleware);
router.get('/contactos', contactosController.getAll); //nos traemos el getAll
router.get('/contactos/:id', contactosController.get);
router.post('/contactos', upload.single('foto'), contactosController.crear);      //para enviar datos
router.put('/contactos/:id', contactosController.actualizar);
router.put('/contactos/:id', contactosController.eliminar);

//usuarios
router.post('/registro', usuariosController.registro)
router.post('/login', usuariosController.login);

module.exports = router; //lo exportamos

