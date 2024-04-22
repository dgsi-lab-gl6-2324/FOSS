var debug = require('debug')('backend:jugadoresController');
var Equipo = require('../models/Equipo');

/* GET lista equipos */
exports.list = (req, res) => {
    Equipo.find().exec()
        .then(equipos => {
            res.status(200).json(equipos);
            debug("GET /equipos");
        })
        .catch(err => {
            res.status(500).json(err);
            debug("GET /equipos ERROR");
        });
}

/* GET detalles equipo */


/* POST nuevo equipo */
exports.new = (req, res) => {
    var nuevoEquipo = new Equipo(req.body);
    nuevoEquipo.save()
        .then(equipo => {
            res.status(201).json(equipo);
            debug("POST /equipos");
        })
        .catch(err => {
            res.status(500).json(err);
            debug("POST /equipos ERROR");
        });
}

/* PUT actualizar equipo */