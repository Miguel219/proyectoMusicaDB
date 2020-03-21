var express = require('express');
var Artist = require('../models/artist');

var api = express.Router();

api.get('/', (req, res) => {
  Artist.getAll((err, artist) => {
    if (err)
      return res.json(err);
    return res.json(artist);
  });
});


api.post('/', (req, res) => {
  var artistName = req.body.artistName;

  Artist.insert(artistName, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = api;