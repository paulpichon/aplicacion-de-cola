//referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

//inicializacion
const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    //activar
    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    //desactivar
    btnCrear.disabled = true;
});


//ultimo ticket
socket.on('ultimo-ticket', ( ultimo ) => {
    lblNuevoTicket.textContent = `Ticket: ${ultimo}`;
});

//listener cuando hagan click en el btnCrear
btnCrear.addEventListener( 'click', () => {
    //aunque el payload lo mandamos en la funcion socketController del archivo controller en realidad no tiene nada por eso lo ponemos como null en los argumentos del emit
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.textContent = ticket;
    });

});