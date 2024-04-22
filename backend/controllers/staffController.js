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
    nuevoStaff.save()
        .then(staff => {
            if (staff.equipo) {
                return Equipo.findById(staff.equipo).exec()
                    .then(equipo => {
                        if (!equipo) {
                            res.status(404).json({message: "Equipo no encontrado"});
                            debug("POST /staff ERROR");
                        }
                        equipo.staff.push(staff._id);
                        return equipo.save();
                    })
                    .then(() => {
                        res.status(201).json(staff);
                        debug("POST /staff");
                    });
            } else {
                res.status(201).json(staff);
                debug("POST /staff");
            }
        })
        .catch(err => {
            res.status(500).json(err);
            debug("POST /staff ERROR");
        });
}