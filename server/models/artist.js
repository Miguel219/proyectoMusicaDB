const db = require('../database');

/* -------------------------------------------------------------------------- */
/*                           Modelos Queries Artist                           */
/* -------------------------------------------------------------------------- */

class Artist {

  static getAll (callback) {
    db.query(`SELECT artistid,name as artistname from artist`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static getAllParams (params,callback) {
    db.query(`SELECT artistid,name as artistname from artist where LOWER(name) like LOWER('%${params.artistname}%') limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

   
  static insert (params, callback) {
    db.query(`INSERT INTO artist (name) VALUES ('${params.artistname}')`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static update (params, callback) {
    db.query(`update artist set name='${params.artistname}' where artistid='${params.artistid}';`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static delete (params, callback) {
    db.query(`delete from artist where artistid=${params.artistid}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }



}

module.exports = Artist;