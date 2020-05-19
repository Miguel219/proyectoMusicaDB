const db = require('../database');

/* -------------------------------------------------------------------------- */
/*                           Modelos Queries Track                           */
/* -------------------------------------------------------------------------- */

class Track {

  static getAll (callback) {
    db.query(`SELECT trackid,name as trackname, isactive from track`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static getAllParams (params,callback) {
    db.query(`select  t.trackid, t.name as trackname, t.isactive, t.albumid, a.title as albumname, t.genreid, g.name as genrename, a.artistid, ar.name as artistname,t.mediatypeid,mt.name as mediatypeName,t.composer,t.milliseconds,t.bytes,t.unitprice, CASE WHEN il.trackid IS NULL THEN false ELSE true end isbought,count(pb.trackid) as totalPlayback,count(il.trackid) as totalSold
    from track t
    inner join album a on a.albumid = t.albumid
    inner join artist ar on ar.artistid = a.artistid
    inner join genre g on g.genreid = t.genreid
    inner join mediatype mt on mt.mediatypeid = t.mediatypeid
    left join playback pb on pb.trackid = t.trackid
    left join invoice i on i.userid = '${params.userid}'
    left join invoiceline il on il.trackid = t.trackid
    where (LOWER(t.name) like LOWER('%${params.trackname}%') and LOWER(a.title) like LOWER('%${params.albumname}%') and LOWER(ar.name) like LOWER('%${params.artistname}%') and LOWER(g.name) like LOWER('%${params.genrename}%')) 
    group by t.trackid,a.title,a.artistid,g.name,ar.name,mt.name,i.invoiceid,  il.trackid    
    order by t.trackid limit ${params.limit}`, (err, res) => {
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

  static generateInvoice (params, callback) {
    db.query(`INSERT INTO invoice(userid, billingaddress, billingcity, billingstate, billingcountry, billingpostalcode, total)
      VALUES ('${params.user.userid}', '${params.user.address}','${params.user.city}' , '${params.user.state}', '${params.user.country}', '${params.user.postalcode}', '${params.total}')
      RETURNING invoiceid`, (err, res) => {
      if (err.error)
        return callback(err);
      params.cart.forEach(track => {
        db.query(`INSERT INTO invoiceline(invoiceid, trackid, unitprice, quantity)
          VALUES ('${res[0].invoiceid}', '${track.trackid}','${track.unitprice}' , 1);`, (err, res) => {
          if (err.error)
            return callback(err);
        });
      });
      callback(res);
    });
  }

  static playbackTrack (params, callback) {
    db.query(`INSERT INTO playback(
       userid, trackid)
      VALUES ('${params.userid}', '${params.trackid}');`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }


}

module.exports = Track;