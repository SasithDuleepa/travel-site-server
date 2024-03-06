const DB = require('../../config/database');

const DeleteHotel = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        if (id) {
            // Delete from hotel_prices
            const query1 = "DELETE FROM hotel_prices WHERE hotel_id = ?";
            await DB.connection.query(query1, [id]);

            // Delete from hotel
            const query2 = "DELETE FROM hotel WHERE hotel_id = ?";
            await DB.connection.query(query2, [id]);

            console.log("Deletion successful");
            res.status(200).send({ message: 'Hotel deleted successfully' });
        } else {
            res.status(400).send({ error: 'Bad Request. Missing ID parameter.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = DeleteHotel;
