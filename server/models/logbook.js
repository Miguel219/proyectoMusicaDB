const db = require('../database');

/* -------------------------------------------------------------------------- */
/*                           Modelos Queries Bitácora                         */
/* -------------------------------------------------------------------------- */

class LogBook {

    //  All Logs
    static getAllParams (params,callback) {
        db.query(`SELECT * from LogBook`, (err, res) => {
          if (err.error)
            return callback(err);
          callback(res);
        });
      }
}

module.exports = LogBook;