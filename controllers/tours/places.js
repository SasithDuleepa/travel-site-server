const DB = require('../../config/database');
const Places = (req,res) =>{
    const { tourId } = req.params;
    console.log(tourId)
    try {
        const query = `
                    SELECT place.*
                    FROM place
                    INNER JOIN tour_places ON place.place_id = tour_places.tour_places_id
                    INNER JOIN tour_date ON tour_places.tour_date_id = tour_date.tour_date_id
                    WHERE tour_date.tour_id = '${tourId}'`;
                    DB.connection.query(query,(err,result)=>{
                        if(result){
                            res.send(result)
                            // console.log(result)
                        }else{
                            console.log(err)
                        }
                    })
    } catch (error) {
        
    }
}
module.exports= Places;