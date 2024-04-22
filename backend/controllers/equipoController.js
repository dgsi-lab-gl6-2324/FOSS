var debug = require('debug')('backend:jugadoresController');
var Equipo = require('../models/Equipo');

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