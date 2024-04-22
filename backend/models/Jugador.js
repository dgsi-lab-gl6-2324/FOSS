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
    email: String,
    telefono: String,
    direccion: String,
    ciudad: String,
    provincia: String,
    zip: String,
    equipo: { type: Schema.Types.ObjectId, ref: 'Equipo' },
    dorsal: Number
}, {collection : 'jugadores'});

module.exports = mongoose.model('Jugador', JugadorSchema);