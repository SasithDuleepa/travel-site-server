const DB = require('./../../config/database');
const fs = require('fs').promises;

const Delete = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            throw new Error('Bad Request: Missing ID parameter');
        }

        // Find place cover and card images
        const query1 = `SELECT card_img, cover_img FROM place WHERE place_id = ?`;
        const result1 = await executeQuery(query1, [id]);

        try {
            if (result1.length > 0) {
                const { card_img, cover_img } = result1[0];
                const path = `./uploads/places/${card_img}`;
                const path1 = `./uploads/places/${cover_img}`;
                await fs.unlink(path);
                await fs.unlink(path1);
            }
        } catch (error) {
            console.error(error);
        }

        // Find place images
        const query2 = `SELECT img_name FROM place_img WHERE place_id = ?`;
        const result2 = await executeQuery(query2, [id]);
        try {
            console.log(result2)
            if (result2.length > 0) {
                for (const image of result2) {
                    const path = `./uploads/places/${image.img_name}`;
                    await fs.unlink(path);
                }
            }
        } catch (error) {
            console.error(error);
        }

        try {
            if (result2.length > 0) {
                // Delete place images
                const query8 = `DELETE FROM place_img WHERE place_id = ?`;
                await executeQuery(query8, [id]);
            }
        } catch (error) {
            console.error(error);
        }

        // Delete place
        const query3 = `DELETE FROM place WHERE place_id = ?`;
        await executeQuery(query3, [id]);

        // Delete from tours_places
        const query4 = `DELETE FROM tour_places WHERE tour_places_id = ?`;
        await executeQuery(query4, [id]);

        // Delete from day_tours_places
        const query5 = `DELETE FROM day_tour_places WHERE place_id = ?`;
        await executeQuery(query5, [id]);

        // Delete from popular place
        const query6 = `DELETE FROM popular_place WHERE place_id = ?`;
        await executeQuery(query6, [id]);

        res.status(200).send({ status: 200, message: 'Success' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: 'Internal Server Error' });
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

module.exports = Delete;
