
const DB = require('../../config/database');

const GetToursAccToId = (req,res) =>{
    const { tour } = req.params;
    // console.log(tour)

    try {


// const query = `SELECT
// t.*,
// td.*,
// lhotel.hotel_name AS luxary_hotel,
// lhotel.hotel_id AS luxary_hotel_id,
// shotel.hotel_name AS semi_hotel,
// shotel.hotel_id AS semi_hotel_id

// FROM
// tour t
// JOIN
// tour_date td ON t.tour_id = td.tour_id
// LEFT JOIN
// hotel lhotel ON td.luxary_hotel = lhotel.hotel_id
// LEFT JOIN
// hotel shotel ON td.semi_hotel = shotel.hotel_id

// WHERE
// t.tour_id = '${tour}';
// `

const query = `SELECT
t.*,
td.*,
lhotel.hotel_name AS luxary_hotel,
lhotel.hotel_id AS luxary_hotel_id,
shotel.hotel_name AS semi_hotel,
shotel.hotel_id AS semi_hotel_id,
tp.tour_places_id,
tp.tour_place_description,
pl.place_name,
pl.card_img,
pl.cover_img AS place_cover_img

FROM
tour t
JOIN
tour_date td ON t.tour_id = td.tour_id
LEFT JOIN
hotel lhotel ON td.luxary_hotel = lhotel.hotel_id
LEFT JOIN
hotel shotel ON td.semi_hotel = shotel.hotel_id
LEFT JOIN
tour_places tp ON tp.tour_date_id = td.tour_date_id
LEFT JOIN
place pl ON tp.tour_places_id = pl.place_id

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
module.exports = GetToursAccToId;