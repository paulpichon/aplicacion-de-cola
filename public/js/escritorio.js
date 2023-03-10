//referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender    = document.querySelector('button');

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
    //aunque el payload lo mandamos en la funcion socketController del archivo controller en realidad no tiene nada por eso lo ponemos como null en los argumentos del emit
    /*socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.textContent = ticket;
    });*/

});