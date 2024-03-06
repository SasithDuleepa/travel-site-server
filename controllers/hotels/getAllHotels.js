const DB = require('./../../config/database');

const GetAll =(req,res) =>{
    const query = `SELECT * FROM hotel`;
    DB.connection.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
}

module.exports = GetAll;