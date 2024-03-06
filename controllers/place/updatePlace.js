const DB = require('./../../config/database');
const fs = require('fs').promises;

const PlaceUpdate = async (req, res) => {
    const { id } = req.params;
    const { coverImgs, cardImg, deletedImgs, name,priority, lat, lng, time, fee, description, short } = req.body;
    const { newCoverImg, newCardImg, newImgs } = req.files;

    let cardImage_success = 0;
    let cardImage_unsuccess = 0;

    let coverImage_success = 0;
    let coverImage_unsuccess = 0;

    let deleteImage_success = 0;
    let deleteImage_unsuccess = 0;

    let newImgs_success = 0;
    let newImgs_unsuccess = 0;

    let data_success = 0;
    let data_unsuccess = 0;

    try {
        // Handle newCardImg
        if (newCardImg) {
            if (cardImg === 'null') {
                await DB.connection.query('UPDATE place SET card_img=? WHERE place_id=?', [newCardImg[0].filename, id]);
                cardImage_success++;
            } else if (cardImg !== 'null') {
                const filePath = `./uploads/places/${cardImg}`;
                await fs.unlink(filePath);
                await DB.connection.query('UPDATE place SET card_img=? WHERE place_id=?', [newCardImg[0].filename, id]);
                cardImage_success++;
            }
        }

        // Handle newCoverImg
        if (newCoverImg) {
            if (coverImgs === 'null') {
                await DB.connection.query('UPDATE place SET cover_img=? WHERE place_id=?', [newCoverImg[0].filename, id]);
                coverImage_success++;
            } else if (coverImgs !== 'null') {
                const filePath = `./uploads/places/${coverImgs}`;
                await fs.unlink(filePath);
                await DB.connection.query('UPDATE place SET cover_img=? WHERE place_id=?', [newCoverImg[0].filename, id]);
                coverImage_success++;
            }
        }

        // Handle deletedImgs
        if (deletedImgs) {
            const deleteImages = Array.isArray(deletedImgs) ? deletedImgs : [deletedImgs];
            await Promise.all(
                deleteImages.map(async (image) => {
                    const filePath = `./uploads/places/${image}`;
                    await fs.unlink(filePath);
                    await DB.connection.query('DELETE FROM place_img WHERE img_name=?', [image]);
                    deleteImage_success++;
                })
            );
        }

        // Handle newImgs
        if (newImgs) {
            await Promise.all(
                newImgs.map(async (img) => {
                    await DB.connection.query('INSERT INTO place_img (place_id, img_name) VALUES (?, ?)', [id, img.filename]);
                    newImgs_success++;
                })
            );
        }

        // Handle other data updates
        if (name || lat || lng || time || fee || description || short || priority) {
            const updateValues = {
                place_name: name,
                priority: priority,
                place_description: description,
                place_lat: lat,
                place_lng: lng,
                visit_time: time,
                visiting_fee: fee,
                short_description: short,
            };
            const updateSet = Object.entries(updateValues)
                .filter(([key, value]) => value !== undefined)
                .map(([key, value]) => `${key}=?`)
                .join(', ');

            const updateQuery = `UPDATE place SET ${updateSet} WHERE place_id=?`;

            await DB.connection.query(updateQuery, [...Object.values(updateValues), id]);
            data_success++;
        }

        // Response
        let responseMessage = 'Update operation completed successfully';
        let success = true;
        if (cardImage_unsuccess > 0 || coverImage_unsuccess > 0 || deleteImage_unsuccess > 0 || newImgs_unsuccess > 0 || data_unsuccess > 0) {
            responseMessage = 'Update operation failed';
            success = false;
        }

        res.json({
            success: success,
            message: responseMessage,
            cardImage: { success: cardImage_success, unsuccess: cardImage_unsuccess },
            coverImage: { success: coverImage_success, unsuccess: coverImage_unsuccess },
            deleteImage: { success: deleteImage_success, unsuccess: deleteImage_unsuccess },
            newImgs: { success: newImgs_success, unsuccess: newImgs_unsuccess },
            data: { success: data_success, unsuccess: data_unsuccess },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = PlaceUpdate;
