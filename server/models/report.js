const db = require('../database');

/* -------------------------------------------------------------------------- */
/*                           Modelos Queries Report                           */
/* -------------------------------------------------------------------------- */

class Report {


  //1.Artistas por área No puede ser implementado
  static getReport1 (params,callback) {
    db.query(`select * from artist limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  //2. Generos con mas canciones
  static getReport2 (params,callback) {
    db.query(`SELECT G.Name AS genre, 
    COUNT(T.TrackId) as trackcount
    FROM Track T 
    INNER JOIN Genre G ON G.GenreId = T.GenreId
    GROUP BY G.GenreId
    ORDER BY COUNT(T.TrackId) DESC limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  //3.Artistas con más albums individuales
  static getReport3 (params,callback) {
    db.query(`select ar.name as artistname ,count(a.albumid) as albumcount
    from artist ar
    inner join album a on a.artistid = ar.artistid
    group by(ar.artistid)
    order by count(a.albumid) DESC limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }


  //4.Canciones de mayor duración con la información de sus artistas
  static getReport4 (params,callback) {
    db.query(`select  t.name as trackname, ar.name as artistname, t.milliseconds
    from track t
    inner join album a on a.albumid = t.albumid
    inner join artist ar on a.artistid= ar.artistid
    order by t.milliseconds DESC limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  // 5.Usuarios que han registrado más canciones
  static getReport5 (params,callback) {
    db.query(`select u.userId, u.name as userName, count(*) as trackcount
    from track t
    inner join users u on u.userId = t.userId
    group by (u.userId)
    order by (count(*))
    limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  //6.Promedio de duración de canciones por género
  static getReport6 (params,callback) {
    db.query(`SELECT G.Name AS genre, 
    AVG(T.milliseconds) as millisecondsavg
    FROM Track T 
    INNER JOIN Genre G ON G.GenreId = T.GenreId
    GROUP BY G.GenreId
    ORDER BY AVG(T.milliseconds) DESC 
    limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  //7.Álbumes más recientes
  static getReport7 (params,callback) {
    db.query(`select albumid, title as albumname
    from album
    order by (albumid) DESC
    limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  //8.Artistas más colaborativos
  static getReport8 (params,callback) {
    db.query(`select  ar.name as artistname ,count(t.trackid) as trackcount
    from artist ar
    inner join album a on a.artistid = ar.artistid
	  inner join track t on t.albumid = a.albumid
    group by(ar.artistid)
    order by count(t.trackid) DESC limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

   




}

module.exports = Report;