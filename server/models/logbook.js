const db = require('../database');

/* -------------------------------------------------------------------------- */
/*                           Modelos Queries Bitácora                         */
/* -------------------------------------------------------------------------- */

class LogBook {

    //  All Logs
    static getAll(callback) {
        db.query(`SELECT LogType, UserId, ObjectType, ObjectId, DateModified FROM LogBook`, (err, res) => {
            if(err.error)
                return callback(err);
            callback(res);
        });
    }
}

module.exports = LogBook;