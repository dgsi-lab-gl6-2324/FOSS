var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StaffSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido1: String,
    apellido2: String,
    edad: Number,
    email: String,
    telefono: String,
    direccion: String,
    ciudad: String,
    provincia: String,
    zip: Number,
    equipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo'
    },
    rol: {
        type: String,
        enum: [
            'entrenador',
            'entrenador2',
            'entrenadorPorteros',
            'delegado',
            'fisioterapeuta',
            'preparador',
            'medico'
        ],
        required: true
    },
    titulo: String
}, { collection: 'staff' });

module.exports = mongoose.model('Staff', StaffSchema);