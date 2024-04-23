var express = require('express');
var router = express.Router();
var Equipo = require('../controllers/equipoController');

/* GET lista equipos */
router.get('/', Equipo.list);

/* GET detalles equipo */
router.get('/:id', Equipo.show);

/* POST nuevo equipo */
router.post('/', Equipo.new);

// /* PUT actualizar equipo */
// router.put('/:id', Equipo.update);

/* GET lista jugadores de un equipo */
router.get('/:id/jugadores', Equipo.jugadores);

module.exports = router;