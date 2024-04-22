var express = require('express');
var router = express.Router();
var Staff = require('../controllers/staffController');

/* GET lista staff */
router.get('/', Staff.list);

/* POST nuevo staff */


/* GET detalles staff */


/* PUT actualizar staff */

module.exports = router;