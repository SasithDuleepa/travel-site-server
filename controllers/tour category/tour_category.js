const DB = require('../../config/database');

const TourCategory =(req,res) =>{
    const { id } = req.params;
    // console.log(id);

    if(id){
        const query = `SELECT * FROM tourcategory WHERE tourcategory_id = '${id}'`;
        DB.connection.query(query,(err,result)=>{
            if(result){
                res.send(result)
            }else{
                console.log(err)
            }
        })
    }
}

module.exports = TourCategory;