const db = require('../database');

/* -------------------------------------------------------------------------- */
/*                           Modelos Queries Mediatype                           */
/* -------------------------------------------------------------------------- */

class Mediatype {

  static getAll (callback) {
    db.query(`SELECT mediatypeid,name as mediatypename from mediatype`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  //TODO IMPLEMENTATION
  // static getAllParams (params,callback) {
  //   db.query(`SELECT mediatypeid,name as mediatypename from mediatype where LOWER(name) like LOWER('%${params.mediatypename}%') limit ${params.limit}`, (err, res) => {
  //     if (err.error)
  //       return callback(err);
  //     callback(res);
  //   });
  // }

  // static getMediatypeAlbums (params,callback) {
  //   db.query(`select a.albumid, a.title as albumname, a.mediatypeid, ar.name as mediatypename
  //   from mediatype ar 
  //   inner join album a on a.mediatypeid=ar.mediatypeid
  //   where (ar.mediatypeid = '${params.mediatypeid}')`, (err, res) => {
  //     if (err.error)
  //       return callback(err);
  //     callback(res);
  //   });
  // }

   
  // static insert (params, callback) {
  //   db.query(`INSERT INTO mediatype (name) VALUES ('${params.mediatypename}')`, (err, res) => {
  //     if (err.error)
  //       return callback(err);
  //     callback(res);
  //   });
  // }

  // static update (params, callback) {
  //   db.query(`update mediatype set name='${params.mediatypename}' where mediatypeid='${params.mediatypeid}';`, (err, res) => {
  //     if (err.error)
  //       return callback(err);
  //     callback(res);
  //   });
  // }

  // static delete (params, callback) {
  //   db.query(`delete from mediatype where mediatypeid=${params.mediatypeid}`, (err, res) => {
  //     if (err.error)
  //       return callback(err);
  //     callback(res);
  //   });
  // }



}

module.exports = Mediatype;