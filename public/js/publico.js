//referencias
const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');


//inicializacion
const socket = io();


//estado actual de los tickets en pantalla
socket.on('estado-actual', ( payload ) => {
    //agregar audio cada que se crea un nuevo ticket
    const audio = new Audio('./audio/new-ticket.mp3');
    //reproducir
    audio.play();

    //desestructuracion de arreglo
    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;
    //renderizar
    //si existe  ticket1
    if ( ticket1 ) {
        lblTicket1.innerHTML = 'Ticket: ' + ticket1.numero;
        lblEscritorio1.innerHTML = ticket1.escritorio;    
    }
    

    //si existe  ticket2
    if ( ticket2 ) {
        lblTicket2.innerHTML = 'Ticket: ' + ticket2.numero;
        lblEscritorio2.innerHTML = ticket2.escritorio;    
    }
    

    //si existe  ticket3
    if ( ticket3 ) {
        lblTicket3.innerHTML = 'Ticket: ' + ticket3.numero;
        lblEscritorio3.innerHTML = ticket3.escritorio;    
    }
    

    //si existe  ticket4
    if ( ticket4 ) {
        lblTicket4.innerHTML = 'Ticket: ' + ticket4.numero;
        lblEscritorio4.innerHTML = ticket4.escritorio;    
    }
    


});