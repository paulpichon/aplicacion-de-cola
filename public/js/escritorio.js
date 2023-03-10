//referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender    = document.querySelector('button');
//renderizar el ticket a atender
const lblTicket     = document.querySelector('small');
//alerta
const divAlerta     = document.querySelector('.alert');


//leer parametros de la URL
//mandamos como parametro el window.location.search
const searchParams = new URLSearchParams( window.location.search );

//verificar si existe el "escritorio"
if ( !searchParams.has('escritorio') ) {
    //redireccionamos al usuario
    window.location = 'index.html';
    //si no existe lanzamos un throw new error
    throw new Error('El escritorio es obligatorio');

}

//saber en que escritorio me encuentro
const escritorio = searchParams.get('escritorio');
//mostrar en el html
lblEscritorio.innerText = escritorio;
//ocultar alerta
divAlerta.style.display = 'none';



//inicializacion
const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    //activar
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    //desactivar
    btnAtender.disabled = true;
});


//ultimo ticket
socket.on('ultimo-ticket', ( ultimo ) => {
    //lblNuevoTicket.textContent = `Ticket: ${ultimo}`;
});

//listener cuando hagan click en el btnCrear
btnAtender.addEventListener( 'click', () => {

    //atender ticket
    socket.emit('atender-ticket', { escritorio }, ( {ok, msg, ticket} ) => {
        
        //verificar si la respuesta es ok = true
        if (!ok) {
            //si ya  no hay mas tickets
            lblTicket.innerText = `Nadie`;
            return divAlerta.style.display = '';
        }

        //mostrar el ticket a ser atendido
        lblTicket.innerText = `Ticket: ${ ticket.numero }`;

    });

});