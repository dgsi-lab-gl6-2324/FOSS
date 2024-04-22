var debug = require('debug')('backend:jugadoresController');
var Equipo = require('../models/Equipo');

/* GET lista equipos */
exports.list = function(req, res) {
    Equipo.find().exec()
        .then(function(equipos){
            res.status(200).json(equipos);
            debug("GET /equipos");
        })
        .catch(function(err){
            res.status(500).json(err);
            debug("GET /equipos ERROR");
        });
}

/* GET detalles equipo */


/* POST nuevo equipo */
exports.new = function(req, res) {
    var nuevoEquipo = new Equipo(req.body);
    nuevoEquipo.save()
        .then(function(equipo){
            res.status(201).json(equipo);
            debug("POST /equipos");
        })
        .catch(function(err){
            res.status(500).json(err);
            debug("POST /equipos ERROR");
        });
}

/* PUT actualizar equipo */