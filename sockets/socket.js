const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');
const bands = new Bands();

bands.addBand( new Band('Queen') );
bands.addBand( new Band('Bon Jovi') );
bands.addBand( new Band('Héroes del silencio') );

console.log(bands);
//mensajes de Sockets
io.on('connection', client => {
    // client.on('event', data => { /* … */ });

    client.emit('bands', bands);
    console.log('cliente conectado');
    client.on('disconnect', () => {
        console.log('cliente desconectado');
     });

    //  client.on('mensaje', (obj) => {
    //     console.log('Llegó el mensaje', obj.mensaja);

    //     client.broadcast.emit('mensaje-enviar', 'hola'); // se envía a todos los clientes que esten escuchando menos a el mismo usuario (cliente)

    //     //al utilizar io emite a todos los clientes
    //     // io.emit('perfecto','Hola mundo ¿cómo te encuentras?');
    //     client.emit('perfecto','Hola mundo ¿cómo te encuentras?');
    // })
    client.on('emitir-mensaje', (obj) =>{
        client.broadcast.emit('emitir-mensaje2', obj);
        console.log('Cominicando', obj);
    });

    client.on('addvote', (id) => {
       bands.voteBand(id);
       console.log('valor del id ', id)
       io.emit('bands', bands);
       
    });
    client.on('addBand', (name) => {
       bands.addBand(new Band(name))
       io.emit('bands', bands);
    });
    client.on('delete-band', (id) => {
      bands.deleteBand(id);
      io.emit('bands', bands);
    })

  });
