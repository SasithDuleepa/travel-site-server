
const DB = require('./../../config/database');
const DeleteAgent = (req,res) =>{
    const {id} = req.params;
    if(id){
        const sql = `DELETE FROM user WHERE user_id = '${id}'`;
        DB.connection.query(sql,(err,result)=>{
            if(err){
                console.log(err);
                res.status(500).json({
                    message:"Error deleting user"
                })
            }else{
                res.status(200).json({
                    message:"success",
                    data:result})
            }
        })

    }
}

module.exports = DeleteAgent;