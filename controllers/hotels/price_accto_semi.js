const DB = require('../../config/database');

const PriceAcctoLuxury =async (req,res) =>{
    const { id, date } = req.params;
    

    let count =0;

    if(id && date){
        const formattedDate = new Date(date).toISOString().split('T')[0];
        count ++;
            const query = `SELECT hp.price
                            FROM travel.tour_date td
                            JOIN travel.hotel_prices hp ON td.semi_hotel = hp.hotel_id 
                            WHERE td.tour_id = '${id}'
                            AND hp.start_date <= '${formattedDate}'
                            AND hp.end_date >= '${formattedDate}';`
                            await DB.connection.query(query, (err, result) => {
                                if (err) {
                                    console.error(err);
                                    res.status(500).json({ error: 'Internal Server Error' });
                                } else {
                                    console.log(id, date);
                                    console.log(result);
                                    res.json(result);
                                }
                            })
    }
    console.log('count =' , count)
}

module.exports = PriceAcctoLuxury;