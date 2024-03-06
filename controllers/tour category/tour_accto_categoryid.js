const DB = require('../../config/database');

const TourAccToCategoryId = (req,res) =>{
    const {id} = req.params;
    console.log(id)

    if(id){
        const query = `SELECT tour.tour_id,tour.tour_name FROM tour
        INNER JOIN tourcategory_tour ON tour.tour_id = tourcategory_tour.tour_id
        WHERE tourcategory_tour.tourcategory_id = '${id}'`;
        DB.connection.query(query,(err,result)=>{
            if(result){
                res.send(result)
            }else{
                console.log(err)
            }
        })

    }

}

module.exports = TourAccToCategoryId;