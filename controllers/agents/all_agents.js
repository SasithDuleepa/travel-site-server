const DB = require('./../../config/database');
const AllAgents = (req,res) => {
    const sql = `SELECT * FROM user WHERE user_role ='agent'`;
    DB.connection.query(sql,(err,result) => {
        if(err) throw err;
        res.send(result);
    })
}

module.exports = AllAgents;