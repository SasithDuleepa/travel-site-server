const DB = require('./../../config/database');

const PlaceSearch = (req, res) => {
    const { place } = req.params;
    // console.log(place);
    if(place){

        const query = `SELECT * FROM place WHERE place_name LIKE '%${place}%' AND status != 'hide';`;
    DB.connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.json({status:400 , message:"not found"})
            

        } else {
            res.json({status:200 , message:"found", data:result})
            
        }
    }
    );

    }else if(!place || place.length==0  ){
        res.json({status:400 , message:"not found"})
    }
    
}
module.exports = PlaceSearch;