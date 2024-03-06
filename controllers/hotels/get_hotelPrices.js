
const DB = require('./../../config/database');

const HotelPrices = (req,res) =>{
    
    try {
        const{id} = req.params;
        console.log(id)
        const query = `SELECT * FROM hotel_prices WHERE hotel_id = '${id}'`;
            DB.connection.query(query,(err,result)=>{
                if(err) throw err;
                else{
                    // console.log(result)
                    
                    res.json(result);
                }
            })
        
    } catch (error) {
        console.log(error)
    }
}
module.exports  = HotelPrices;





