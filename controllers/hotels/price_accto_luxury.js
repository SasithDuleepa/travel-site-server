const DB = require('./../../config/database');

const PriceAcctoSemiLuxury = (req, res) => {
    const { id, date } = req.params;
    console.log(id, date);

    if (id && date) {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        console.log(formattedDate);

        const query = `SELECT hp.price
            FROM travel.tour_date td
            JOIN travel.hotel_prices hp ON td.luxary_hotel = hp.hotel_id 
            WHERE hp.start_date <= ? AND hp.end_date >= ? AND td.tour_id = ?`;

        DB.connection.query(query, [ formattedDate, formattedDate,id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log(result);
                res.json(result);
            }
        });
    } else {
        res.status(400).json({ error: 'Bad Request' });
    }
};

module.exports = PriceAcctoSemiLuxury;
