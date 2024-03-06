const DB = require('../../config/database');

const AllPlaces_admin =(req,res) =>{
    const query = `SELECT * FROM place`;
    DB.connection.query(query,(err,result)=>{
        if(err){
            res.json({ status:400 ,  message:"eror" })
        }else if(result){
            
            res.json({ status:200 ,  message:"success" , data:result })
        }
    
})
}
module.exports = AllPlaces_admin;