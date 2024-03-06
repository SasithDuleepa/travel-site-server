const DB = require('./../../config/database');

const GetReportHotels =(req,res) =>{
    const query = `SELECT hotel.*, hotel_prices.start_date, hotel_prices.end_date, hotel_prices.price, hotel_prices.hotel_id AS hotelId
    FROM hotel
    INNER JOIN hotel_prices ON hotel.hotel_id = hotel_prices.hotel_id

    `;
    DB.connection.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
}

module.exports = GetReportHotels;