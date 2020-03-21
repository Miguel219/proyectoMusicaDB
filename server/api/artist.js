var express = require('express');
var Artist = require('../models/artist');
/* -------------------------------------------------------------------------- */
/*                                 Artist Api                                 */
/* -------------------------------------------------------------------------- */

var api = express.Router();



//Get all Artists
api.get('/', (req, res) => {
  Artist.getAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Get Artists params
api.post('/get', (req, res) => {
  let params = req.body;
  Artist.getAllParams(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


//Get Artists Albums 
api.post('/getArtistAlbums', (req, res) => {
  let params = req.body;
  Artist.getArtistAlbums(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Insert Artist
api.post('/', (req, res) => {
  let params = req.body;
  Artist.insert(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Update Artist
api.put('/', (req, res) => {
  let params = req.body;
  Artist.update(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Delete Artist
api.delete('/', (req, res) => {
  let params = req.body;
  Artist.delete(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = api;