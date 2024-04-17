var debug = require('debug')('backend:jugadoresController');
var mongoose = require('mongoose');
var Jugador = require('../models/Jugador');

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

exports.new = function(req, res) {
    var nuevoJugador = new Jugador(req.body);
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
