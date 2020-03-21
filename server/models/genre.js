const db = require('../database');

class Artist {
  static getAll (callback) {
    db.query('SELECT name from artist', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (artistName, callback) {
    db.query('INSERT INTO artist (name) VALUES ($1)', [artistName], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Artist;