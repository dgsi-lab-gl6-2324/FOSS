var express = require('express');
var router = express.Router();
var Jugador = require('../controllers/jugadoresController');
var jugador = require('../models/Jugador');

/* GET lista jugadores */
router.get('/', Jugador.list);

/* POST nuevo jugador */
router.post('/', Jugador.new);

/* GET detalles jugador */
router.get('/:id', Jugador.show);

module.exports = router;