var express = require('express');
var Track = require('../models/track');
/* -------------------------------------------------------------------------- */
/*                                 Track Api                                 */
/* -------------------------------------------------------------------------- */

var api = express.Router();



//Get all Tracks
api.get('/', (req, res) => {
  Track.getAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Get Tracks params
api.post('/get', (req, res) => {
  let params = req.body;
  Track.getAllParams(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Insert Track
api.post('/', (req, res) => {
  let params = req.body;
  Track.insert(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Update Track
api.put('/', (req, res) => {
  let params = req.body;
  Track.update(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


//Update Track Active
api.put('/active', (req, res) => {
  let params = req.body;
  Track.updateActive(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Delete Track
api.delete('/', (req, res) => {
  let params = req.body;
  Track.delete(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Insert Invoice Track
api.post('/generateInvoice', (req, res) => {
  let params = req.body;
  Track.generateInvoice(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Playback a track
api.post('/playbackTrack', (req, res) => {
  let params = req.body;
  Track.playbackTrack(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Playback tracks
api.post('/playbackTracks', (req, res) => {
  let params = req.body;
  Track.playbackTracks(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = api;