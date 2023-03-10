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

    //atender ticket
    socket.on('atender-ticket', ({ escritorio}, callback) => {
        //validar si viene el escritorio
        if ( !escritorio ) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        //asignar ticket
        const ticket = ticketControl.atenderTicket( escritorio );
        //si el ticket no existe
        if ( !ticket ) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            //si si hay ticker regresamos el callback con el ticket que sera atendido
            callback({
                ok: true,
                ticket
            });
        }

    });

}



module.exports = {
    socketController
}

