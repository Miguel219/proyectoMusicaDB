const db = require('../database');

/* -------------------------------------------------------------------------- */
/*                           Modelos Queries Album                           */
/* -------------------------------------------------------------------------- */

class Album {

  static getAll (callback) {
    db.query(`SELECT albumid,title as albumname from album`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static getAllParams (params,callback) {
    db.query(`select a.albumid, a.title  as albumname, a.artistid, ar.name as artistname
    from album a
    inner join artist ar on ar.artistid=a.artistid
    where (LOWER(a.title) like '%${params.albumname}%' and LOWER(ar.name) like '%${params.artistname}%') order by a.albumid limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static getAlbumTracks (params,callback) {
    db.query(`select t.trackId, t.name as trackName, t.isactive,t.albumId,a.title as albumName, t.genreid, g.name as genrename, a.artistid, ar.name as artistname,t.mediatypeid,mt.name as mediatypeName,t.composer,t.milliseconds,t.bytes,t.unitprice
    from album a
    inner join track t on t.albumid=a.albumid
    inner join artist ar on ar.artistid = a.artistid
    inner join genre g on g.genreid = t.genreid
    inner join mediatype mt on mt.mediatypeid = t.mediatypeid
    where (a.albumid='${params.albumid}')`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

   
  static insert (params, callback) {
    db.query(`INSERT INTO album (title,artistid) VALUES ('${params.albumname}','${params.artistid}')`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static update (params, callback) {
    db.query(`update album set title='${params.albumname}', artistid='${params.artistid}' where albumid='${params.albumid}';`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static delete (params, callback) {
    db.query(`delete from album where albumid=${params.albumid}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }



}

module.exports = Album;