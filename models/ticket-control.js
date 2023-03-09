//path para poder construir el PATH donde lo voy a almacenar
const path = require('path');
//file System para poder grabar en un archivo
const fs   = require('fs');

//clase del ticket
class Ticket {
    //recibimos como argumento el numero
    constructor( numero, escritorio ) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

//clase
class TicketControl {

    constructor() {
        //ultimo ticket que se esta atendiendo
        this.ultimo   = 0;
        //saber que dia es hoy
        this.hoy      = new Date().getDate();//solo el dia
        //tickets que estan pendientes
        this.tickets  = [];
        //ultimos 4 tickets en la cola
        this.ultimos4 = [];



        //llamamos el init()
        this.init();
    }

    //crear un getter : que es similar/igual a una funcion
    //el objetivo del getter es que luzca como una propiedad de la clase
    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    //inicializar el servidor o la CLASE
    init() {
        //se lee el archivo JSON, esta es otra forma para poder ller la informacion de un archivo JSON
        //al mismo tiempo desestructuramos las propiedades del objeto
        const { ultimo, hoy, tickets, ultimos4 } = require('../db/data.json');
        //verificar si coninciden las propiedades hoy === this.hoy
        if ( hoy === this.hoy ) {
            //si esto es cierto, significa que estoy recargando el servidor en el mismo dia
            //por lo tanto this.tickets === tickets del JSON
            this.tickets = tickets;
            //el ultimo sera igual a this.ultimo
            this.ultimo  = ultimo;
            //los ultimos 4
            this.ultimos4 = ultimos4;
        } else {
            //en caso de que pase aqui, significa que es otro dia
            //debemos guardar en la base de datos
            this.guardarDB();//guardar en el JSON

        }

    }

    //guardar DB
    guardarDB()  {

        //construir el PATH del archivo JSON DB
        const dbPath = path.join( __dirname, '../db/data.json' );
        //grabar en el archivo
        //pasamos el getter toJson por .stringify() para transformarlo
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ));
    }

    //metodo para hacer el siguiente ticket
    siguiente() {
        //acumulador
        this.ultimo += 1;
        //crear una nueva instancia de la clase ticket
        //recordar que el ticket pide 2 argumentos/parametros numero, escritorio
        //y como no hay escritorio lo podemos dejar como null
        const ticket = new Ticket( this.ultimo, null );
        //insertar el ticket en el arreglo de tickets con .push()
        this.ticket.push( ticket );
        //esto se podria resumir en una sola linea
        //this.ticket.push( new Ticket( this.ultimo, null ) );

        //guardar en la base de datos
        this.guardarDB();

        //retornamos el ticket mas el numero de ticket
        return `Ticket: ${ ticket.numero }`;
    }

    //atender ticket
    //recibe como parametro un escritorio
    //esta metodo puede regresar dos opciones un NULL o el TICKET que sera atendido por el escritorio enel parametro
    atenderTicket( escritorio ) {
        //supongamos que ya no haya tickets
        if ( this.tickets.length === 0 ) {
            //retornamos null, es decir no hay ningun ticket que se pueda atender
            return null;
        }

        //pero si, si hay tickets
        //y se elimina el elemento --> this.tickets[0]; con shift();
        const ticket = this.tickets.shift(); //this.tickets[0];
        //escritorio
        ticket.escritorio = escritorio; //el escritorio que recibo com argumento

        //agregamos el ticket al principio con .unshift() y enviamos el ticket que tengo
        this.ultimos4.unshift( ticket );

        //verificar que siempre sean 4 tickets
        if ( this.ultimos4.length > 4 ) {
            //borramos el ultimo ticket
            //( -1, 1) ---> -1 = la ultima posicion del arreglo, 1 = solamente que corte una posicion
            this.ultimos4.splice( -1, 1 );
        }

        //guardamos en la base de datos
        this.guardarDB();
        
        //retornamos el ticket que estamos atendiendo
        return ticket;
    }

}

//exportar
module.exports = TicketControl;