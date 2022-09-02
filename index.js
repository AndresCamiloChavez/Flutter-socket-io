const express = require('express'); //es como una importación
const path = require('path');
require('dotenv').config();


//DB Config

const { dbConnection } = require('./database/config').dbConnection();

//App de Express
const app = express();

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');
//



const publicPath = path.resolve( __dirname, 'public')
app.use(express.static(publicPath));

server.listen(process.env.PORT , (error) => {
    if(error) throw new Error(error);
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})