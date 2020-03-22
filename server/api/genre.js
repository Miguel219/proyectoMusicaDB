var express = require('express');
var Genre = require('../models/genre');
/* -------------------------------------------------------------------------- */
/*                                 Genre Api                                 */
/* -------------------------------------------------------------------------- */

var api = express.Router();



//Get all Genres
api.get('/', (req, res) => {
  Genre.getAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


// TOODO IMPLEMENTATION
// //Get Genres params
// api.post('/get', (req, res) => {
//   let params = req.body;
//   Genre.getAllParams(params, (err, result) => {
//     if (err)
//       return res.json(err);
//     return res.json(result);
//   });
// });


// //Insert Genre
// api.post('/', (req, res) => {
//   let params = req.body;
//   Genre.insert(params, (err, result) => {
//     if (err)
//       return res.json(err);
//     return res.json(result);
//   });
// });

// //Update Genre
// api.put('/', (req, res) => {
//   let params = req.body;
//   Genre.update(params, (err, result) => {
//     if (err)
//       return res.json(err);
//     return res.json(result);
//   });
// });

// //Delete Genre
// api.delete('/', (req, res) => {
//   let params = req.body;
//   Genre.delete(params, (err, result) => {
//     if (err)
//       return res.json(err);
//     return res.json(result);
//   });
// });

module.exports = api;