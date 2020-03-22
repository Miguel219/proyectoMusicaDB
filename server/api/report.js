var express = require('express');
var Report = require('../models/report');
/* -------------------------------------------------------------------------- */
/*                                 Report Api                                 */
/* -------------------------------------------------------------------------- */

var api = express.Router();



// 1.Artistas por área
api.post('/1', (req, res) => {
  let params = req.body;
  Report.getReport1(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


// 2.Géneros con más canciones
api.post('/2', (req, res) => {
  let params = req.body;
  Report.getReport2(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


// 3.Artistas con más albums individuales
api.post('/3', (req, res) => {
  let params = req.body;
  Report.getReport3(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


// 4.Canciones de mayor duración con la información de sus artistas
api.post('/4', (req, res) => {
  let params = req.body;
  Report.getReport4(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


// 5.Usuarios que han registrado más canciones
api.post('/5', (req, res) => {
  let params = req.body;
  Report.getReport5(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


// 6.Promedio de duración de canciones por género
api.post('/6', (req, res) => {
  let params = req.body;
  Report.getReport6(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


// 7.Álbumes más recientes
api.post('/7', (req, res) => {
  let params = req.body;
  Report.getReport7(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


// 8.Artistas más colaborativos
api.post('/8', (req, res) => {
  let params = req.body;
  Report.getReport8(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});




module.exports = api;