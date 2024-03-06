const DB = require('../../config/database');

const SearchHotel = ( req,res) =>{
    const {hotel} = req.params;
    console.log(hotel);
    const query = `SELECT * FROM hotel WHERE hotel_name LIKE '%${hotel}%'`;
    DB.connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })

}

module.exports = SearchHotel;