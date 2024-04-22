var mongoose = require('mongoose');
var schema = mongoose.Schema;

var EquipoSchema = new schema({
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    jugadores: [{ 
        type: schema.Types.ObjectId, 
        ref: 'Jugador' 
    }]
}, { collection: 'equipos' });

module.exports = mongoose.model('Equipo', EquipoSchema);