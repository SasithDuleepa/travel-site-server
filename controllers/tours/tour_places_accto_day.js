

const DB = require('../../config/database');

const TourPlacesAccToDate = (req,res) =>{
    const { tourdateid } = req.params;
    // console.log(tourdateid)
    try {
        // const query = `SELECT * FROM tour_places WHERE tour_date_id = '${tourdateid}'`;
        const query = `
      SELECT place.place_id, place.place_name ,tour_places.tour_place_description
      FROM tour_places
      INNER JOIN place ON tour_places.tour_places_id = place.place_id
      WHERE tour_places.tour_date_id = '${tourdateid}'`;
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

module.exports = TourPlacesAccToDate;

// const query = `
// SELECT place.*
// FROM place
// INNER JOIN tour_places ON place.place_id = tour_places.tour_places_id
// INNER JOIN tour_date ON tour_places.tour_date_id = tour_date.tour_date_id

// WHERE tour_date.tour_id = '${tourdateid}'`;