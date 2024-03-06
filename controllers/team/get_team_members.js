const DB = require('../../config/database');

const GetTeamMembers =(req,res) =>{
    const query = `SELECT * FROM team`;
    DB.connection.query(query,(err,result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(result);
    })
}

module.exports = GetTeamMembers;