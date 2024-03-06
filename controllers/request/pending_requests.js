const DB = require('../../config/database');

const PendingRequsts = (req,res ) =>{
    const query = `SELECT * FROM request WHERE status = 'pending'`;
    DB.connection.query(query,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
}

module.exports = PendingRequsts;