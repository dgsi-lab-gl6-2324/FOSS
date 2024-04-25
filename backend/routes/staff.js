var express = require('express');
var router = express.Router();
var Staff = require('../controllers/staffController');

/* GET lista staff */
router.get('/', Staff.list);

/* POST nuevo staff */
router.post('/', Staff.new);

/* GET detalles staff */


/* PUT actualizar staff */


/* DELETE eliminar staff */
post.delete('/:id', Staff.delete);

module.exports = router;