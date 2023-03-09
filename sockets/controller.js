//importamos TicketControl
const TicketControl = require('../models/ticket-control');
//una instancia de TicketControl
const ticketControl = new TicketControl();


const socketController = (socket) => {

    //socket.on('disconnect', () => {});

    socket.on('enviar-mensaje', ( payload, callback ) => {
        
        const id = 123456789;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload );

    })

}



module.exports = {
    socketController
}

