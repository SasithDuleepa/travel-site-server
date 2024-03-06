const DB = require('../../config/database');

const SearchCode = (req, res) => {  
    const { code } = req.params;
    console.log(code);
    const sql = `SELECT * FROM promote_code WHERE promote_code LIKE '%${code}%'`;
    DB.connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
}
module.exports = SearchCode;