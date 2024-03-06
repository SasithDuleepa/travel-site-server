
const DB = require('../../config/database');

const ToursAccToId = (req,res) =>{
    const { tour } = req.params;
    // console.log(tour)

    try {


const query = `SELECT
t.*,
td.*,
lhotel.hotel_name AS luxary_hotel,
lhotel.hotel_id AS luxary_hotel_id,
shotel.hotel_name AS semi_hotel,
shotel.hotel_id AS semi_hotel_id

FROM
tour t
JOIN
tour_date td ON t.tour_id = td.tour_id
LEFT JOIN
hotel lhotel ON td.luxary_hotel = lhotel.hotel_id
LEFT JOIN
hotel shotel ON td.semi_hotel = shotel.hotel_id

WHERE
t.tour_id = '${tour}';
`




        DB.connection.query(query,(err,result)=>{
            if(err) throw err;
            else{
                res.send(result);
                // console.log(result)
            }

        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = ToursAccToId;