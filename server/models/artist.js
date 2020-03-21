const db = require('../database');

/* -------------------------------------------------------------------------- */
/*                           Modelos Queries Artist                           */
/* -------------------------------------------------------------------------- */

class Artist {

  static getAll (callback) {
    db.query(`SELECT * from artist`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static getAllParams (params,callback) {
    db.query(`SELECT * from artist where name like '%${params.search}%' limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

   
  static insert (params, callback) {
    db.query(`INSERT INTO artist (name) VALUES ('${params.artistName}')`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static update (params, callback) {
    db.query(`update artist set name='${params.artistName}' where artistid='${params.artistId}';`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static delete (params, callback) {
    db.query(`delete from artist where artistid=${params.artistId}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }



}

module.exports = Artist;