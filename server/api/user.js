var express = require('express');
var user = require('../models/user');
/* -------------------------------------------------------------------------- */
/*                                 user Api                                 */
/* -------------------------------------------------------------------------- */

var api = express.Router();



//Get all users
api.get('/', (req, res) => {
  user.getAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Login user
api.post('/loginuser', (req, res) => {
  let params = req.body;
  user.loginuser(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Get users permissions
api.post('/getUserPermissions', (req, res) => {
  let params = req.body;
  user.getUserPermissions(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


//is user id taken
api.post('/useridtaken', (req, res) => {
  let params = req.body;
  user.useridtaken(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});




//Insert user
api.post('/', (req, res) => {
  let params = req.body;
  user.insert(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Update user
api.put('/', (req, res) => {
  let params = req.body;
  user.update(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Update user
api.put('/assignRole', (req, res) => {
  let params = req.body;
  user.assignRole(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Update user
api.put('/unassignRole', (req, res) => {
  let params = req.body;
  user.unassignRole(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Delete user
api.delete('/', (req, res) => {
  let params = req.body;
  user.delete(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = api;