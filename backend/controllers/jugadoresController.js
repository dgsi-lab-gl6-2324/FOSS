var debug = require('debug')('backend:jugadoresController');
var Jugador = require('../models/Jugador');

/* GET lista jugadores */
exports.list = function(req, res) {
    Jugador.find().exec()
        .then(function(jugadores){
            res.status(200).json(jugadores);
            debug("GET /jugadores");
        })
        .catch(function(err){
            res.status(500).json(err);
            debug("GET /jugadores ERROR");
        });
};

/* POST nuevo jugador */
exports.new = function(req, res) {
    var nuevoJugador = new Jugador({
        nombre: req.body.nombre,
        apellido1: req.body.apellido1,
        apellido2: req.body.apellido2,
        edad: req.body.edad,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        ciudad: req.body.ciudad,
        provincia: req.body.provincia,
        zip: req.body.zip,
        equipo: req.body.equipo ? req.body.equipo : null,
        dorsal: req.body.dorsal
    });
    nuevoJugador.save()
        .then(function(jugador){
            res.status(201).json(jugador);
            debug("POST /jugadores");
        })
        .catch(function(err){
            res.status(500).json(err);
            debug("POST /jugadores ERROR");
        });
}

/* GET detalles jugador */
exports.show = function(req, res) {
    Jugador.findById(req.params.id).exec()
        .then(function(jugador){
            res.status(200).json(jugador);
            debug("GET /jugadores/%s", req.params.id);
        })
        .catch(function(err){
            res.status(500).json(err);
            debug("GET /jugadores/%s ERROR", req.params.id);
        });
}

/* PUT actualizar jugador */
exports.update = function(req, res) {
    Jugador.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
        .then(function(jugador){
            res.status(200).json(jugador);
            debug("PUT /jugadores/%s", req.params.id);
        })
        .catch(function(err){
            res.status(500).json(err);
            debug("PUT /jugadores/%s ERROR", req.params.id);
        });
}

/* DELETE borrar jugador */
exports.delete = function(req, res) {
    Jugador.findOneAndDelete(req.params.id).exec()
        .then(function(jugador){
            res.status(200).json(jugador);
            debug("DELETE /jugadores/%s", req.params.id);
        })
        .catch(function(err){
            res.status(500).json(err);
            debug("DELETE /jugadores/%s ERROR", req.params.id);
        });
}