const express = require('express'); //requerimos express que previamente instalamos con npm install express
const mongoose = require('mongoose');  //requerimos mongoose para la conexion con la db

require('dotenv').config();

const apiRoutes = require('./src/routes/api');      //nos traemos las rutas de la api

const app = express(); //inicializamos nuestra app ejecutando express solamente

const port = process.env.PORT || 3000; //determinamos el puerto a utilizar

app.use(express.json());

app.use(apiRoutes); //le decimos a la app que use las rutas especificadas en api 

app.get('', (req, res) => {     //definimos nuestro endpoint raiz o inicial
    res.send('api works!');     //mandamos un mensaje de regreso al navegador
});        


//const uri = 'mongodb+srv://usuario_prueba:prueba@cluster0.crcxk5w.mongodb.net/agenda_contactos?retryWrites=true&w=majority'; //acceso a db

const uri = process.env.MONGODB;

//Error-first callback
mongoose.connect(uri, (err) => {       //mongoose es un objeto con funciones en este caso connect
    if(err) {
        console.log('No se pudo conectar a la base de datos');
    }else {
        console.log('Se pudo conectar correctamente a la BD');
        app.listen(port, () => {        //ponemos a escuchar a la app en el puerto indicado
            const env = process.env.NODE_ENV;
            if (env === 'local') {
                console.log('app is running in LOCAL in port ' + port);
            }else {
                console.log('app is running in PRODUCCION in port ' + port);
            }
        });
    }
}); 

