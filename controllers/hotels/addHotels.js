const DB = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const AddHotels = (req, res) => {
    console.log(req.body);
    try {
        const { hotelName, lat, lng, category, prices } = req.body;
        

        if (hotelName !== '' && lat !== '' && lng !== '' && category !== '') {
            const id_1 = uuidv4();
            const _Id = id_1.substr(0, 6);
            const ID = 'hotel-' + _Id;

            const insertHotelQuery = `INSERT INTO hotel (hotel_id, hotel_name, hotel_lat, hotel_lang, hotel_category) VALUES ('${ID}','${hotelName}','${lat}','${lng}','${category}')`;

            DB.connection.query(insertHotelQuery, (err, hotelResult) => {
                if (!err) {
                    console.log(hotelResult);

                    prices.forEach(element => {
                        const insertPriceQuery = `INSERT INTO hotel_prices (hotel_id, start_date, end_date, price) VALUES ('${ID}','${element.dayStart}','${element.dayEnd}','${element.price}')`;

                        DB.connection.query(insertPriceQuery, (priceErr, priceResult) => {
                            if (!priceErr) {
                                console.log(priceResult);
                            } else {
                                console.log(priceErr);
                            }
                        });
                    });
                    res.status(200).json({ message: 'Hotel and prices added successfully' });
                } else {
                    console.log(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            });
        } else {
            res.status(400).json({ error: 'Missing required fields' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = AddHotels;
