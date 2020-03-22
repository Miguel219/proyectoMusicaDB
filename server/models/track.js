const db = require('../database');

/* -------------------------------------------------------------------------- */
/*                           Modelos Queries Track                           */
/* -------------------------------------------------------------------------- */

class Track {

  static getAll (callback) {
    db.query(`SELECT trackid,name as trackname from track`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static getAllParams (params,callback) {
    db.query(`select  t.trackid, t.name as trackname, t.albumId,a.title as albumname, t.genreid, g.name as genrename, a.artistid, ar.name as artistname,t.mediatypeid,mt.name as mediatypeName,t.composer,t.milliseconds,t.bytes,t.unitprice
    from track t
    inner join album a on a.albumid = t.albumid
    inner join artist ar on ar.artistid = a.artistid
    inner join genre g on g.genreid = t.genreid
    inner join mediatype mt on mt.mediatypeid = t.mediatypeid
    where (LOWER(t.name) like LOWER('%${params.trackname}%') and LOWER(a.title) like LOWER('%${params.albumname}%') and LOWER(ar.name) like LOWER('%${params.artistname}%') and LOWER(g.name) like LOWER('%${params.genrename}%')) limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

   
  static insert (params, callback) {
    db.query(`INSERT INTO track(name, albumid, mediatypeid, genreid, composer, milliseconds, bytes, unitprice,userid)
      VALUES ('${params.trackname}', '${params.albumid}','${params.mediatypeid}' , '${params.genreid}', '${params.composer}', '${params.milliseconds}', '${params.bytes}', '${params.unitprice}','${params.userid}');`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static update (params, callback) {
    db.query(`UPDATE track
    SET  name='${params.trackname}', userid='${params.userid}',albumid='${params.albumid}', mediatypeid='${params.mediatypeid}', genreid='${params.genreid}', composer='${params.composer}', milliseconds='${params.milliseconds}', bytes='${params.bytes}', unitprice='${params.unitprice}'
    where trackid='${params.trackid}';`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static updateActive (params, callback) {
    db.query(`UPDATE track
    SET  isactive='${params.isactive}'
    where trackid='${params.trackid}';`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static delete (params, callback) {
    db.query(`delete from track where trackid=${params.trackid}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }



}

module.exports = Track;