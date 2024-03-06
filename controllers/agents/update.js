const DB = require('./../../config/database');
const Update =(req,res) =>{
    const {id} = req.params;
    const {name,email,password} = req.body;

    if(id && name && email && password){
        const sql = `UPDATE user SET fname = '${name}', email = '${email}', password = '${password}' WHERE user_id = '${id}'`;
        DB.connection.query(sql,(err,result)=>{
            if(err){
                console.error(err);
                return res.status(500).json({message:"Error updating user"});
            }
            return res.status(200).json({message:"User updated successfully"});
        })

    }
        
}
module.exports = Update;