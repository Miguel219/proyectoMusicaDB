var express = require('express');
var Album = require('../models/album');
/* -------------------------------------------------------------------------- */
/*                                 Album Api                                 */
/* -------------------------------------------------------------------------- */

var api = express.Router();



//Get all Albums
api.get('/', (req, res) => {
  Album.getAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Get Albums params
api.post('/get', (req, res) => {
  let params = req.body;
  Album.getAllParams(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


//Get Albums Albums 
api.post('/getAlbumTracks', (req, res) => {
  let params = req.body;
  Album.getAlbumTracks(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Insert Album
api.post('/', (req, res) => {
  let params = req.body;
  Album.insert(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Update Album
api.put('/', (req, res) => {
  let params = req.body;
  Album.update(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Delete Album
api.delete('/', (req, res) => {
  let params = req.body;
  Album.delete(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = api;