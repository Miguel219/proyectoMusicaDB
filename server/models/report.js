const db = require('../database');

/* -------------------------------------------------------------------------- */
/*                           Modelos Queries Report                           */
/* -------------------------------------------------------------------------- */

class Report {


  //1.Artistas con más álbumes
  static getReport1 (params,callback) {
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

  //2. Generos con mas canciones
  static getReport2 (params,callback) {
    db.query(`SELECT G.Name AS genre, 
    COUNT(distinct T.TrackId) as trackcount
    FROM Track T 
    INNER JOIN Genre G ON G.GenreId = T.GenreId
    GROUP BY G.GenreId
    ORDER BY COUNT(distinct T.TrackId) DESC limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  //3.Total de duración de cada playlist
  static getReport3 (params,callback) {
    db.query(`select distinct p.name as playlistname,sum(t.milliseconds) as summilliseconds
    from playlist p
    inner join playlisttrack pt on p.playlistid = pt.playlistid
    inner join track t on t.trackid = pt.trackid
    group by p.playlistid
    order by sum(t.milliseconds) DESC limit ${params.limit}`, (err, res) => {
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
    order by (count(*)) DESC
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
    db.query(`select distinct p.name as playlistname,count(distinct ar.artistid) as countartist
    from playlist p
    inner join playlisttrack pt on p.playlistid = pt.playlistid
    inner join track t on t.trackid = pt.trackid
    inner join album a on a.albumid = t.albumid
    inner join artist ar on ar.artistid = a.artistid
    group by p.playlistid
    order by count(distinct ar.artistid) DESC
    limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  //8.Artistas más colaborativos
  static getReport8 (params,callback) {
    db.query(`select ar.name as artistname ,count(distinct g.genreid) as countgenre
    from track t 
    inner join album a on a.albumid = t.trackid
    inner join artist ar on ar.artistid = a.artistid
    inner join genre  g on g.genreid = t.genreid
    group by ar.artistid
    order by count(distinct g.genreid) DESC limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

   

  //9. Totales
  static getReport9 (params,callback) {
    db.query(`select 'Canciones' as namecount,count(*) as countcant
    from track
    union
    select 'Artistas' as namecount,count(*) as countcant
    from artist
    union
    select 'Álbums' as namecount,count(*) as countcant
    from album
    UNION
    select 'Géneros' as namecount,count(*) as countcant
    from genre
    union
    select 'Playlists' as namecount,count(*) as countcant
    from playlist
    union
    select 'MediaTypes' as namecount,count(*) as countcant
    from mediatype
    order by namecount limit ${params.limit}`, (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }


}

module.exports = Report;