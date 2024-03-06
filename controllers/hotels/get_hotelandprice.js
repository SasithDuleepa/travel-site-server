const DB = require('../../config/database');

const GetHotelAndPrice  = (req,res) =>{
    const {id} = req.params;
    console.log(id)
    if(id){
        const query  = `
            SELECT hotel.*,hotel_prices.* 
            FROM hotel_prices 
            INNER JOIN hotel ON hotel_prices.hotel_id = hotel.hotel_id
            WHERE hotel_prices.hotel_id = '${id}'`;
            DB.connection.query(query,(err,result) =>{
                if(err) throw err;
                else{
                    // console.log(result)
                    
                    res.json(result);
                }
            })

    }
}

module.exports = GetHotelAndPrice; 