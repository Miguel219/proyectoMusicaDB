var express = require('express');
var role = require('../models/role');
/* -------------------------------------------------------------------------- */
/*                                 role Api                                 */
/* -------------------------------------------------------------------------- */

var api = express.Router();



//Get all roles
api.get('/', (req, res) => {
  role.getAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Get all roles
api.get('/getUserListAll', (req, res) => {
  role.getAllUsers((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//assignPermission
api.post('/assignPermission', (req, res) => {
  let params = req.body;
  role.assignPermission(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//unassignPermission
api.post('/unassignPermission', (req, res) => {
  let params = req.body;
  role.unassignPermission(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Get user  permissions
api.post('/getUserPermissions', (req, res) => {
  let params = req.body;
  role.getUserPermissions(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});






//Insert role
api.post('/', (req, res) => {
  let params = req.body;
  role.insert(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Update role
api.put('/', (req, res) => {
  let params = req.body;
  role.update(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Update assign role
api.put('/assignRole', (req, res) => {
  let params = req.body;
  role.assignRole(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Update unassign role
api.put('/unassignRole', (req, res) => {
  let params = req.body;
  role.unassignRole(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

//Delete role
api.delete('/', (req, res) => {
  let params = req.body;
  role.delete(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


//Get roles  permissions
api.post('/getRolePermissions', (req, res) => {
  let params = req.body;
  role.getRolePermissions(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


//Get user  permissions
api.post('/getPermissions', (req, res) => {
  let params = req.body;
  role.getPermissions(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});


//getPermissionsOutOfRole
api.post('/getPermissionsOutOfRole', (req, res) => {
  let params = req.body;
  role.getPermissionsOutOfRole(params, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = api;