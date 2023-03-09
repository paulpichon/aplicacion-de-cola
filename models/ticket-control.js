//path para poder construir el PATH donde lo voy a almacenar
const path = require('path');
//file System para poder grabar en un archivo
const fs   = require('fs');

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

}

//exportar
module.exports = TicketControl;