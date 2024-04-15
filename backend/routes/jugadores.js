var express = require('express');
var router = express.Router();
var jugador = require('../models/Jugador');

/* GET lista jugadores. */
router.get('/', function(req, res) {
    jugador.find().exec()
        .then(jugadores => res.status(200).json(jugadores))
        .catch(err => res.status(500).json(err));
});

/* POST nuevo jugador. */
router.post('/', function(req, res) {
    var nuevoJugador = new jugador(req.body);
    nuevoJugador.save()
        .then(jugador => res.status(201).json(jugador))
        .catch(err => res.status(500).json(err));
});

module.exports = router;