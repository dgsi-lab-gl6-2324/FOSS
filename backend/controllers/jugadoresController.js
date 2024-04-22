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
                        equipo.jugadores.push(jugador);
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
    Jugador.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec()
        .then(jugador => {
            res.status(200).json(jugador);
            debug("PUT /jugadores/%s", req.params.id);
        })
        .catch(err => {
            res.status(500).json(err);
            debug("PUT /jugadores/%s ERROR", req.params.id);
        });
}

/* DELETE borrar jugador */
exports.delete = (req, res) => {
    Jugador.findOneAndDelete(req.params.id).exec()
        .then(jugador => {
            res.status(200).json(jugador);
            debug("DELETE /jugadores/%s", req.params.id);
        })
        .catch(err => {
            res.status(500).json(err);
            debug("DELETE /jugadores/%s ERROR", req.params.id);
        });
}