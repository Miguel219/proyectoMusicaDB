const db = require('../database');

/* -------------------------------------------------------------------------- */
/*                           Modelos Queries User                           */
/* -------------------------------------------------------------------------- */

class User {

  static getAll (callback) {
    db.query(`SELECT u.userid,u.name as username,u.roleid, r.name as rolename from users u 
    inner join role r on r.roleid = u.roleid
    where u.roleid>1`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static loginuser (params,callback) {
    db.query(`SELECT *
    FROM users u
    WHERE u.userid='${params.userid}' and u.password='${params.password}' and EXISTS 
    (SELECT *
    FROM users u
    WHERE u.userid='${params.userid}' and u.password='${params.password}') and u.userid<>'' and u.password<>'';
    `, (err, res) => {
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

  static useridtaken (params,callback) {
    db.query(`SELECT (count(*)>0 )as isuseridtaken
    FROM users u
    WHERE u.userid='${params.userid}' `, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

   
  static insert (params, callback) {
    db.query(`INSERT INTO users(
       name, lastname, birthdate, userid, password)
      VALUES ('${params.name}', '${params.lastname}', '${params.birthdate}', '${params.userid}', '${params.password}')`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static update (params, callback) {
    db.query(`update users set name='${params.name}',lastname='${params.lastname}',birthdate='${params.birthdate}',password='${params.password}' where userid='${params.userid}';`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static assignRole (params, callback) {
    db.query(`update users set roleid='${params.roleid}' where userId='${params.userid}';`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static unassignRole (params, callback) {
    db.query(`update users set roleid=DEFAULT where userId='${params.userid}';`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
  static delete (params, callback) {
    db.query(`delete from user where userId='${params.userid}'`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }



}

module.exports = User;