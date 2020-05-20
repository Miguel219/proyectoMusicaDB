const db = require('../database');

/* -------------------------------------------------------------------------- */
/*                           Modelos Queries Role                           */
/* -------------------------------------------------------------------------- */

class Role {

  static getAll (callback) {
    db.query(`SELECT roleid,name as rolename from role where roleid>1`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static getAllUsers (callback) {
    db.query(`SELECT userid,name as username from users where roleid>1`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
  
  static getUserPermissions (params,callback) {
    db.query(`select p.permissionid,p.name as permissionname
    from users u
    inner join rolespermissions rp on rp.roleid = u.roleid
    inner join permission p  on p.permissionid=rp.permissionid
    where userId='${params.userid}'`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  

   
  static insert (params, callback) {
    db.query(`INSERT INTO role(
       name)
      VALUES ('${params.rolename}')`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static update (params, callback) {
    db.query(`update role set name='${params.rolename}' where roleId='${params.roleid}';`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static assignRole (params, callback) {
    db.query(`update users set roleid='${params.roleid}' where userId='${params.roleid}';`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static unassignRole (params, callback) {
    db.query(`update users set roleid=DEFAULT where userId='${params.roleid}';`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static assignPermission (params, callback) {
    db.query(`INSERT INTO rolespermissions(
      roleid, permissionid)
      VALUES ('${params.roleid}', '${params.permissionid}');`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static unassignPermission (params, callback) {
    db.query(`delete from rolespermissions where roleId='${params.roleid}' and permissionId='${params.permissionid}';`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static delete (params, callback) {
    db.query(`delete from role where roleId='${params.roleid}'`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static getPermissions (params,callback) {
    db.query(`
    select permissionid, name as permissionname from permission where permissionid>5 and permissionid<>29 and permissionid<>30`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static getPermissionsOutOfRole (params,callback) {
    db.query(`select p.permissionid, p.name as permissionname
    from permission p 
    left  join rolespermissions rp on p.permissionid = rp.permissionid and rp.roleid=${params.roleid}
    where rp.permissionid is null and p.permissionid>5`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static getRolePermissions (params,callback) {
    db.query(`select p.permissionid, p.name as permissionname 
    from permission p 
    inner join rolespermissions rp on p.permissionid = rp.permissionid 
    where rp.roleid=${params.roleid}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }


}

module.exports = Role;