var express = require('express');
var router = express.Router();
var Equipo = require('../controllers/equipoController');

/* GET lista equipos */
router.get('/', Equipo.list);

/* POST nuevo equipo */
router.post('/', Equipo.new);

/* GET detalles equipo */
router.get('/:id', Equipo.show);

/* PUT actualizar equipo */
router.put('/:id', Equipo.update);

module.exports = router;