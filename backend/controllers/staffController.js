var debug = require('debug')('backend:staffController');
var Staff = require('../models/Staff');
var Equipo = require('../models/Equipo');

/* GET lista staff */
exports.list = (req, res) => {
    Staff.find().exec()
        .then(staff => {
            res.status(200).json(staff);
            debug("GET /staff");
        })
        .catch(err => {
            res.status(500).json(err);
            debug("GET /staff ERROR");
        });
};

/* POST nuevo staff */
exports.new = (req, res) => {
    var nuevoStaff = new Staff({
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
        rol: req.body.rol,
        titulo: req.body.titulo
    });
    if (nuevoStaff.equipo) {
        Equipo.findById(nuevoStaff.equipo).exec()
            .then(equipo => {
                if (!equipo) {
                    const error = new Error("Equipo no encontrado");
                    error.status = 404;
                    throw error;
                }
                return nuevoStaff.save();
            })
            .then(staff => {
                return Equipo.findByIdAndUpdate(
                    { _id: nuevoStaff.equipo },
                    { $push: {staff: staff._id }}
                ).exec()
                    .then(() => {
                        res.status(201).json(staff);
                        debug("POST /staff")
                    })
            })
            .catch(err => {
                if (err.status === 404) {
                    res.status(err.status).json({ message: err.message, statusCode: err.status });
                } else {
                    res.status(500).json({ message: err.message, statusCode: 500 });
                }
                debug("POST /staff ERROR");
            });
    } else {
        nuevoStaff.save()
            .then(staff => {
                res.status(201).json(staff);
                debug("POST /staff");
            })
            .catch(err => {
                res.status(500).json({ message: err.message, statusCode: 500 });
                debug("POST /staff ERROR");
            });
    }
}

/* GET detalles staff */
