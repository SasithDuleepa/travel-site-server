const DB = require('./../../config/database');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const TourUpdate = async (req, res) => {
    console.log(req.body);

    const { id, name, description, image, new_image, cover_image, new_cover_image, distance,days, dayData } = req.body;

    // Delete existing data
    await Delete(id, res); 
    

    // Delete image
    if (req.files.new_image) {
        const Image = image;
        const path = `./uploads/tour/${Image}`;
        
        try {
            await fs.unlink(path);
        } catch (error) {
            
        }
    }

    // Delete cover
    if (req.files.new_cover_image) {
        const cover = cover_image;
        const path = `./uploads/tour/${cover}`;
        try {
            await fs.unlink(path);
        } catch (error) {
            
        }
        
    }

    try {
        let tourImg = req.files.new_image ? req.files.new_image[0].filename : image;
        let coverImg = req.files.new_cover_image ? req.files.new_cover_image[0].filename : cover_image;
        // Insert tour data
        const query = `INSERT INTO tour (tour_id, tour_name, tour_description, tour_img, distance, cover_img,days)
                       VALUES  (?, ?, ?, ?, ?, ?,?)`;
        const tourParams = [id, name, description, tourImg, distance, coverImg,days];
        await executeQuery(query, tourParams);

        // Insert day data
        if (dayData.length > 0) {
            // const dayDataArray = JSON.parse(dayData);
            const dayDataArray = dayData;
            for (const day of dayDataArray) {
                const dayId = 'tp-day-' + uuidv4().substr(0, 6);
                const queryDay = `INSERT INTO tour_date (tour_date_id, tour_id, tour_date, luxary_hotel, semi_hotel, start_description)
                                  VALUES (?, ?, ?, ?, ?, ?)`;
                const dayParams = [dayId, id, day.day, day.luxury_hotel_id, day.semi_hotel_id, day.day_sartDescription];
                await executeQuery(queryDay, dayParams);

                // Insert places for each day
                if (day.places.length > 0) {
                    for (const place of day.places) {
                        const queryPlace = `INSERT INTO tour_places (tour_date_id, tour_places_id, tour_place_description)
                                            VALUES (?, ?, ?)`;
                        const placeParams = [dayId, place.place_id, place.tour_place_description];
                        await executeQuery(queryPlace, placeParams);
                    }
                }
            }
        }

        res.status(200).json({ status: 200, message: 'Tour updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Something went wrong' });
    }
};

const Delete = async (id, res) => {
    try {
        // Delete from tour category
        // const query1 = `DELETE FROM tourcategory_tour WHERE tour_id = ?`;
        // await executeQuery(query1, [id]);

        // Get image name and delete from file
        const query5 = `SELECT tour_img FROM tour WHERE tour_id = ?`;
        const result5 = await executeQuery(query5, [id]);

        // Get day IDs
        const query = `SELECT tour_date_id FROM tour_date WHERE tour_id = ?`;
        const result = await executeQuery(query, [id]);

        // Delete places for each day
        for (const element of result) {
            const query2 = `DELETE FROM tour_places WHERE tour_date_id = ?`;
            await executeQuery(query2, [element.tour_date_id]);
        }

        // Delete from tour date
        const query3 = `DELETE FROM tour_date WHERE tour_id = ?`;
        await executeQuery(query3, [id]);

        // Delete from tour
        const query4 = `DELETE FROM tour WHERE tour_id = ?`;
        await executeQuery(query4, [id]);

        // res.status(200).send({ status: 200, message: 'Tour deleted successfully' });
    } catch (error) {
        console.error(error);
        // res.status(500).send({ status: 500, message: 'Something went wrong' });
    }
};

const executeQuery = (query, values) => {
    return new Promise((resolve, reject) => {
        DB.connection.query(query, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = TourUpdate;
