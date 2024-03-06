
const DB = require('../../config/database');
const ToursAccToTourCategory = (req,res) =>{
    const data = []
    const {tourcategory } = req.params;
    try {
        const query = `SELECT tour.* FROM tour
        INNER JOIN tourcategory_tour ON tour.tour_id = tourcategory_tour.tour_id
        WHERE tourcategory_tour.tourcategory_id = '${tourcategory}'`;
        DB.connection.query(query,(err,Result)=>{
            if(Result){
                
                // console.log(Result)

                res.send(Result)
            }else{
                console.log(err)
            }
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = ToursAccToTourCategory;