const DB = require('../../config/database');

const CodeData = (req, res) => {
    const { code } = req.params;
    
    if(code){
        const sql = `SELECT promote_code.*,user.fname
         FROM promote_code
         INNER JOIN user ON promote_code.promote_code_used_id = user.user_id
         WHERE promote_code.promote_code = ?`;
        DB.connection.query(sql, [code], (err, result) => {
            if(err) throw err;
            res.json(result);
        })
    }
}

module.exports = CodeData;