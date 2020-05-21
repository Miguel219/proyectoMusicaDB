var express = require('express');
var LogBook = require('../models/logbook');
/* -------------------------------------------------------------------------- */
/*                                 LogBook Api                                */
/* -------------------------------------------------------------------------- */

var api = express.Router();

//Get LogBook params
api.post('/get', (req, res) => {
    let params = req.body;
    LogBook.getAllParams(params, (err, result) => {
      if (err)
        return res.json(err);
      return res.json(result);
    });
  });

module.exports = api;