const DB = require('./../../config/database');

const PriceAccToHotelAndDate = (req, res) => {
    const { id, date } = req.params;
    console.log(id, date);

    // Convert the date to a MySQL-compatible format
    const formattedDate = new Date(date).toISOString().split('T')[0];

    // Use placeholders in the query to prevent SQL injection
    const query = `
        SELECT price
        FROM hotel_prices
        WHERE start_date <= ? AND end_date >= ? AND hotel_id = ?
    `;

    DB.connection.query(query, [formattedDate, formattedDate, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(result);
            res.json(result);
        }
    });
};

module.exports = PriceAccToHotelAndDate;
