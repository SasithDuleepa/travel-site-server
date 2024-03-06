const DB = require('../../config/database');

const formatDate = (date) => {
    const parsedDate = new Date(date);

    if (!isNaN(parsedDate)) {
        return parsedDate.toISOString().split('T')[0];
    } else {
        return date;
    }
};

const UpdateHotels = async (req, res) => {
    console.log(req.body)
    try {
        const { id } = req.params;
        const { hotel_name, lat, lang, type, new_prices, hotel_data } = req.body;

        if (hotel_name && lat && lang && type) {
            const query1 = `UPDATE hotel SET hotel_name = '${hotel_name}', hotel_lat = '${lat}', hotel_lang = '${lang}', hotel_category = '${type}' WHERE hotel_id = '${id}'`;
            await DB.connection.query(query1);
        }

        // Delete existing hotel_prices
        const query3 = `DELETE FROM hotel_prices WHERE hotel_id = '${id}'`;
        await DB.connection.query(query3);

        // Add hotel_prices from hotel_data
        if (hotel_data.length > 0) {
            for (const element of hotel_data) {
                const query2 = `INSERT INTO hotel_prices (hotel_id, start_date, end_date, price) VALUES ('${id}','${formatDate(element.start_date)}','${formatDate(element.end_date)}','${element.price}')`;
                await DB.connection.query(query2);
            }
        }

        // Add new_prices
        if (new_prices.length > 0) {
            for (const element of new_prices) {
                const query2 = `INSERT INTO hotel_prices (hotel_id, start_date, end_date, price) VALUES ('${id}','${element.start_date}','${element.end_date}','${element.price}')`;
                await DB.connection.query(query2);
            }
        }

        res.status(200).send({ message: 'Hotel updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = UpdateHotels;
