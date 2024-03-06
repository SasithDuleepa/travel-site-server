const DB = require('./../../config/database');

const GetPopularPlace = (req,res)=>{
    try {
        const query = `SELECT place.* FROM place
        INNER JOIN popular_place ON place.place_id = popular_place.place_id`;
        DB.connection.query(query,(error,result)=>{
            if(result){
                res.send(result)
            }else{
              console.log(error)
            }
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = GetPopularPlace;