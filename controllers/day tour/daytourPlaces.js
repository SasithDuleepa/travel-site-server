
const DB = require('../../config/database');

const DaytourPlaces =(req,res) =>{
    const {id} = req.params;
    const sql = `SELECT day_tour_places.*,place.place_name FROM day_tour_places JOIN place ON day_tour_places.place_id = place.place_id WHERE day_tour_id = '${id}'`;
    DB.connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })

}
module.exports = DaytourPlaces;