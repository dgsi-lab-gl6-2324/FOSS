var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var JugadorSchema = new Schema({
    nombre: {
        type: String,
        requiered: true
    },
    apellido1: String,
    apellido2: String,
    edad: Number,
    posicion: String,
    altura: Number,
    peso: Number
}, {collection : 'jugadores'});