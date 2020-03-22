const db = require('../database');

/* -------------------------------------------------------------------------- */
/*                           Modelos Queries Genre                           */
/* -------------------------------------------------------------------------- */

class Genre {

  static getAll (callback) {
    db.query(`SELECT genreid,name as genrename from genre`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  //TODO IMPLEMENTATION
  // static getAllParams (params,callback) {
  //   db.query(`SELECT genreid,name as genrename from genre where LOWER(name) like LOWER('%${params.genrename}%') limit ${params.limit}`, (err, res) => {
  //     if (err.error)
  //       return callback(err);
  //     callback(res);
  //   });
  // }

  // static getGenreAlbums (params,callback) {
  //   db.query(`select a.albumid, a.title as albumname, a.genreid, ar.name as genrename
  //   from genre ar 
  //   inner join album a on a.genreid=ar.genreid
  //   where (ar.genreid = '${params.genreid}')`, (err, res) => {
  //     if (err.error)
  //       return callback(err);
  //     callback(res);
  //   });
  // }

   
  // static insert (params, callback) {
  //   db.query(`INSERT INTO genre (name) VALUES ('${params.genrename}')`, (err, res) => {
  //     if (err.error)
  //       return callback(err);
  //     callback(res);
  //   });
  // }

  // static update (params, callback) {
  //   db.query(`update genre set name='${params.genrename}' where genreid='${params.genreid}';`, (err, res) => {
  //     if (err.error)
  //       return callback(err);
  //     callback(res);
  //   });
  // }

  // static delete (params, callback) {
  //   db.query(`delete from genre where genreid=${params.genreid}`, (err, res) => {
  //     if (err.error)
  //       return callback(err);
  //     callback(res);
  //   });
  // }



}

module.exports = Genre;