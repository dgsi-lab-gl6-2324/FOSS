var express = require('express');
var router = express.Router();
var Jugador = require('../controllers/jugadoresController');

/* GET lista jugadores */
router.get('/', Jugador.list);

/* POST nuevo jugador */
router.post('/', Jugador.new);

/* GET detalles jugador */
router.get('/:id', Jugador.show);

/* PUT actualizar jugador */
router.put('/:id', Jugador.update);

/* DELETE borrar jugador */
router.delete('/:id', Jugador.delete);

module.exports = router;