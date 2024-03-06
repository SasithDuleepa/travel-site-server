const DB = require('./../../config/database');

const GetAgent = (req, res) => {
    const { id } = req.params;

    if(id){
        const sql = `SELECT * FROM user WHERE user_role = 'agent'  AND user_id = '${id}'`;
        DB.connection.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result);
        })

    }
}

module.exports = GetAgent; 