var mongoose = require('mongoose');
var schema = mongoose.Schema;

var EquipoSchema = new schema({
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        enum: [
            'prebenjamin',
            'benjamin',
            'alevin',
            'infantil',
            'cadete',
            'juvenil'
        ],
        required: true
    },
    jugadores: [{ 
        type: schema.Types.ObjectId, 
        ref: 'Jugador' 
    }],
    staff: [{ 
        type: schema.Types.ObjectId, 
        ref: 'Staff' 
    }]
}, { collection: 'equipos' });

module.exports = mongoose.model('Equipo', EquipoSchema);