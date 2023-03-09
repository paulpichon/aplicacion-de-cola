//importamos TicketControl
const TicketControl = require('../models/ticket-control');
//una instancia de TicketControl
const ticketControl = new TicketControl();


const socketController = (socket) => {
    //ultimo ticket
    socket.emit('ultimo-ticket', ticketControl.ultimo);

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        //ticket siguiente
        const siguiente = ticketControl.siguiente();
        //callback
        callback( siguiente );

        //TO DO

    });

}



module.exports = {
    socketController
}

