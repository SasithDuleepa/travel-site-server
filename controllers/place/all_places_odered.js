const DB = require('../../config/database');

const AllPlacesPrioritized = (req,res) => {

    const query = `SELECT * FROM travel.place WHERE status != 'hide' ORDER BY priority`;
    DB.connection.query(query,(err,result)=>{
        if(err){
            res.json({ status:400 ,  message:"error" })
        }else if(result){
           
            res.json({ status:200 ,  message:"success" , data:result })
        }
    
})


}

module.exports = AllPlacesPrioritized