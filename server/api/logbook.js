var express = require('express');
var LogBook = require('../models/logbook');
/* -------------------------------------------------------------------------- */
/*                                 LogBook Api                                */
/* -------------------------------------------------------------------------- */

var api = express.Router();

//  Get all Logs
api.get('/', (req, res) => {
    LogBook.getAll((err, result) => {
        if(err)
            return res.json(err);
        return res.json(result);
    });
});

module.exports = api;