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