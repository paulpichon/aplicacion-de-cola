//importamos TicketControl
const TicketControl = require('../models/ticket-control');
//una instancia de TicketControl
const ticketControl = new TicketControl();


const socketController = (socket) => {
    //estos eventos pasan cuando un cliente se conecta
    //ultimo ticket
    socket.emit( 'ultimo-ticket', ticketControl.ultimo);
    //ultimos 4 tickets
    socket.emit( 'estado-actual', ticketControl.ultimos4 );
    //mostrar los ticket en cola
    socket.emit( 'ticket-pendientes', ticketControl.tickets.length );

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        //ticket siguiente
        const siguiente = ticketControl.siguiente();
        //callback
        callback( siguiente );
        //actualizar los tickets en cola de cada escritorio
        socket.broadcast.emit( 'ticket-pendientes', ticketControl.tickets.length );

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
        //ultimos 4 tickets notificar cambio en los ultimos 4 tickets
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4 );
        //actualizar los ticket pendientes en cada escritorio
        //mostrar los ticket en cola
        socket.emit( 'ticket-pendientes', ticketControl.tickets.length );
        socket.broadcast.emit( 'ticket-pendientes', ticketControl.tickets.length );

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

