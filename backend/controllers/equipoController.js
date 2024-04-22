var debug = require('debug')('backend:jugadoresController');
var Equipo = require('../models/Equipo');
var Jugador = require('../models/Jugador');
var Staff = require('../models/Staff');

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
        jugadores: req.body.jugadores ? req.body.jugadores : [],
        staff: req.body.staff ? req.body.staff : []
    });
    nuevoEquipo.save()
        .then(equipo => {
            let promises = [];

            if (equipo.jugadores.length > 0) {
                // Actualiza los jugadores
                promises.push(...equipo.jugadores.map(jugadorId => {
                    return Jugador.findById(jugadorId).exec()
                        .then(jugador => {
                            if (!jugador) {
                                res.status(404).json({ message: "Jugador no encontrado" });
                                debug("POST /equipos ERROR jugadaor no encontrado");
                            }
                            jugador.equipo = equipo._id;
                            return jugador.save();
                        });
                }));
            }

            if (equipo.staff.length > 0) {
                // Actualiza el staff
                promises.push(...equipo.staff.map(staffId => {
                    return Staff.findById(staffId).exec()
                        .then(staff => {
                            if (!staff) {
                                res.status(404).json({ message: "Staff no encontrado" });
                                debug("POST /equipos ERROR staff no encontrado");
                            }
                            staff.equipo = equipo._id;
                            debug("POST a equipo %s con el staff %s", equipo._id, staff._id);
                            return staff.save();
                        });
                }));
            }

            // Espera a que todas las promesas se resuelvan
            return Promise.all(promises)
                .then(() => {
                    res.status(201).json(equipo);
                    debug("POST /equipos");
                });
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