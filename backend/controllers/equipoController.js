var debug = require('debug')('backend:jugadoresController');
var Equipo = require('../models/Equipo');
var Jugador = require('../models/Jugador');

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
exports.show = (req, res) => {
    Equipo.findById(req.params.id).exec()
        .then(equipo => {
            res.status(200).json(equipo);
            debug("GET /equipos/:id");
        })
        .catch(err => {
            res.status(500).json(err);
            debug("GET /equipos/:id ERROR");
        });
}

/* POST nuevo equipo */
exports.new = (req, res) => {
    var nuevoEquipo = new Equipo({
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        jugadores: req.body.jugadores ? req.body.jugadores : []
        // TODO: añadir staff
    });
    nuevoEquipo.save()
        .then(equipo => {
            if (equipo.jugadores.length > 0) {
                // Recorre la lista de jugadores y actualiza cada uno de ellos
                let promises = equipo.jugadores.map(jugadorId => {
                    return Jugador.findById(jugadorId).exec()
                        .then(jugador => {
                            if (!jugador) {
                                res.status(404).json({message: "Jugador no encontrado"});
                                debug("POST /equipos ERROR");
                            }
                            jugador.equipo = equipo._id;
                            return jugador.save();
                        });
                });
                // Espera a que todas las promesas se resuelvan
                return Promise.all(promises)
                    .then(() => {
                        res.status(201).json(equipo);
                        debug("POST /equipos");
                    });
            } else {
                res.status(201).json(equipo);
                debug("POST /equipos");
            }
        })
        .catch(err => {
            res.status(500).json(err);
            debug("POST /equipos ERROR");
        });
}

/* PUT actualizar equipo */


/* GET lista jugadores de un equipo */
exports.jugadores = (req, res) => {
    Equipo.findById(req.params.id).populate('jugadores').exec()
        .then(equipo => {
            res.status(200).json(equipo.jugadores);
            debug("GET /equipos/%s/jugadores", req.params.id);
        })
        .catch(err => {
            res.status(500).json(err);
            debug("GET /equipos/%s/jugadores ERROR", req.params.id);
        });
}