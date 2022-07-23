const {io} = require('../index')
//mensajes de Sockets
io.on('connection', client => {
    // client.on('event', data => { /* … */ });
    console.log('cliente conectado');
    client.on('disconnect', () => {
        console.log('cliente desconectado');
     });

     client.on('mensaje', (obj) => {
        console.log('Llegó el mensaje', obj);

        //al utilizar io emite a todos los clientes
        // io.emit('perfecto','Hola mundo ¿cómo te encuentras?');
        client.emit('perfecto','Hola mundo ¿cómo te encuentras?');
    })
  });
