var debug = require('debug')('backend:jugadoresController');
var Jugador = require('../models/Jugador');
var Equipo = require('../models/Equipo');

/* GET lista jugadores */
exports.list = (req, res) => {
    Jugador.find().exec()
        .then(jugadores => {
            res.status(200).json(jugadores);
            debug("GET /jugadores");
        })
        .catch(err => {
            res.status(500).json(err);
            debug("GET /jugadores ERROR");
        });
};

/* POST nuevo jugador */
exports.new = (req, res) => {
    var nuevoJugador = new Jugador({
        nombre: req.body.nombre,
        apellido1: req.body.apellido1,
        apellido2: req.body.apellido2,
        edad: req.body.edad,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        ciudad: req.body.ciudad,
        provincia: req.body.provincia,
        zip: req.body.zip,
        equipo: req.body.equipo ? req.body.equipo : null,
        dorsal: req.body.dorsal
    });
    nuevoJugador.save()
        .then(jugador => {
            if (jugador.equipo) {
                return Equipo.findById(jugador.equipo).exec()
                    .then(equipo => {
                        if (!equipo) {
                            res.status(404).json({message: "Equipo no encontrado"});
                            debug("POST /jugadores ERROR");
                        }
                        equipo.jugadores.push(jugador._id);
                        return equipo.save();
                    })
                    .then(() => {
                        res.status(201).json(jugador);
                        debug("POST /jugadores");
                    });
            } else {
                res.status(201).json(jugador);
                debug("POST /jugadores");
            }
        })
        .catch(err => {
            res.status(500).json(err);
            debug("POST /jugadores ERROR");
        });
}

/* GET detalles jugador */
exports.show = (req, res) => {
    Jugador.findById(req.params.id).exec()
        .then(jugador => {
            if (!jugador) {
                res.status(404).json({ message: "Jugador no encontrado" });
                debug("GET /jugadores/%s ERROR", req.params.id);
            }
            res.status(200).json(jugador);
            debug("GET /jugadores/%s", req.params.id);
        })
        .catch(err => {
            res.status(500).json(err);
            debug("GET /jugadores/%s ERROR", req.params.id);
        });
}

/* PUT actualizar jugador */
exports.update = (req, res) => {
    let oldTeamId;

    Jugador.findById(req.params.id).exec()
        .then(jugador => {
            if (!jugador) {
                res.status(404).json({ message: "Jugador no encontrado" });
                debug("PUT /jugadores ERROR");
            }
            oldTeamId = jugador.equipo;

            jugador.nombre = req.body.nombre ? req.body.nombre : jugador.nombre;
            jugador.apellido1 = req.body.apellido1 ? req.body.apellido1 : jugador.apellido1;
            jugador.apellido2 = req.body.apellido2 ? req.body.apellido2 : jugador.apellido2;
            jugador.edad = req.body.edad ? req.body.edad : jugador.edad;
            jugador.email = req.body.email ? req.body.email : jugador.email;
            jugador.telefono = req.body.telefono ? req.body.telefono : jugador.telefono;
            jugador.direccion = req.body.direccion ? req.body.direccion : jugador.direccion;
            jugador.ciudad = req.body.ciudad ? req.body.ciudad : jugador.ciudad;
            jugador.provincia = req.body.provincia ? req.body.provincia : jugador.provincia;
            jugador.zip = req.body.zip ? req.body.zip : jugador.zip;
            jugador.equipo = req.body.equipo ? req.body.equipo : jugador.equipo;
            jugador.dorsal = req.body.dorsal ? req.body.dorsal : jugador.dorsal;
            
            return jugador.save();
        })
        .then(jugador => {
            let promises = [];

            if (oldTeamId) {
                promises.push(Equipo.findById(oldTeamId).exec()
                .then(equipo => {
                    if (equipo) {
                        debug(typeof(equipo.jugadores))
                        equipo.jugadores.splice(equipo.jugadores.indexOf(req.params.id, 1));
                        return equipo.save();
                    }
                }));
            }

            if (jugador.equipo) {
                promises.push(Equipo.findById(jugador.equipo).exec()
                    .then(equipo => {
                        if (equipo) {
                            equipo.jugadores.push(jugador._id);
                            return equipo.save();
                        }
                    }));
            }

            return Promise.all(promises)
                .then(() => {
                    res.status(200).json(jugador);
                    debug("PUT /jugadores/%s", req.params.id);
                })
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
            debug("PUT /jugadores/%s ERROR", req.params.id);
        })
}

/* DELETE borrar jugador */
exports.delete = (req, res) => {
    Jugador.findOneAndDelete(req.params.id).exec()
        .then(jugador => {
            if (!jugador) {
                res.status(404).json({ message: "Jugador no encontrado" });
                debug("DELETE /jugadores/%s ERROR", req.params.id);
            }
            res.status(200).json(jugador);
            debug("DELETE /jugadores/%s", req.params.id);
        })
        .catch(err => {
            res.status(500).json(err);
            debug("DELETE /jugadores/%s ERROR", req.params.id);
        });
}