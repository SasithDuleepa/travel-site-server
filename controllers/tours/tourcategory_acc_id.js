const DB = require('../../config/database');

const GetTourCategoryAccToId = (req,res) =>{
    const { tour } = req.params;
    // console.log(tour)

    try {
        const query = `SELECT * FROM tourcategory WHERE tourcategory_id = '${tour}'`;
        DB.connection.query(query,(err,result)=>{
            if(result){
                res.send(result)
            }else{
                console.log(err)
            }
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = GetTourCategoryAccToId;