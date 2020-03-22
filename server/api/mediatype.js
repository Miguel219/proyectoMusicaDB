var express = require('express');
var Mediatype = require('../models/mediatype');
/* -------------------------------------------------------------------------- */
/*                                 Mediatype Api                                 */
/* -------------------------------------------------------------------------- */

var api = express.Router();



//Get all Mediatypes
api.get('/', (req, res) => {
  Mediatype.getAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


// TOODO IMPLEMENTATION
// //Get Mediatypes params
// api.post('/get', (req, res) => {
//   let params = req.body;
//   Mediatype.getAllParams(params, (err, result) => {
//     if (err)
//       return res.json(err);
//     return res.json(result);
//   });
// });


// //Insert Mediatype
// api.post('/', (req, res) => {
//   let params = req.body;
//   Mediatype.insert(params, (err, result) => {
//     if (err)
//       return res.json(err);
//     return res.json(result);
//   });
// });

// //Update Mediatype
// api.put('/', (req, res) => {
//   let params = req.body;
//   Mediatype.update(params, (err, result) => {
//     if (err)
//       return res.json(err);
//     return res.json(result);
//   });
// });

// //Delete Mediatype
// api.delete('/', (req, res) => {
//   let params = req.body;
//   Mediatype.delete(params, (err, result) => {
//     if (err)
//       return res.json(err);
//     return res.json(result);
//   });
// });

module.exports = api;