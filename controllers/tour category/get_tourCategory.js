const DB = require('../../config/database');

const GetTourCategories = (req,res) =>{
    const query = `SELECT * FROM tourcategory`;
    DB.connection.query(query,(err,result)=>{
        if(result){
            // console.log(result);
            
            res.status(200).send(result);
        }
        else{
            res.status(500).send(err);
        }
    })
}
module.exports = GetTourCategories;