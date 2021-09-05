const express = require('express')
var cors = require('cors');
const { dbConnection } = require('./config.db');
const { readConsole, pausa } = require('../api/helpers/console.helper');
//const { dbConnection } = require('../database/config');
var server = '';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.placesPath = '/api/place';
        this.dbConnection();
        this.middlewares();
        this.routes();
        //this.main();
    }

     async main(){
         let response = '';
         do{
            response = await readConsole();     
            if(response !== '0'){
                console.log('Response de lugar: '+ response);
            }
            await pausa();
         }while(response !== '0'){
             server.close(() => {
                console.log('Programa terminado');
                process.exit(0);
            });
         }
    }
    
    async dbConnection(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors())
        //Lectura y parseo del Body (Post, Put, etc). Serializa todo lo que venga a formato JSON
        this.app.use(express.json());
        //Directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
        //Middware que se carga cuando pasa una solicitud por esta ruta. Para utilizar las request que estan dentro de Routes
       this.app.use(this.placesPath, require('../api/routes/place.routes'));
    }

    listen(){
        server = this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: '+ this.port)
        });
    }
}

module.exports = Server;