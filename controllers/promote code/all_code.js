const DB = require('../../config/database');

const AllCode =  (req,res) => {
    const sql = `SELECT * FROM promote_code`;
    DB.connection.query(sql,(err,result) => {
        if(err) throw err;
        res.send(result);
    })
}

module.exports = AllCode;