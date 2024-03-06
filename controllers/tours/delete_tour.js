const DB = require('../../config/database');
const fs = require('fs').promises;

const DeleteTour = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        // Delete from tour category
        const query1 = `DELETE FROM tourcategory_tour WHERE tour_id = ?`;
        await executeQuery(query1, [id]);

        // Get image name and delete from file
        const query5 = `SELECT tour_img FROM tour WHERE tour_id = ?`;
        const result5 = await executeQuery(query5, [id]);

        if (result5.length > 0) {
            const image = result5[0].tour_img;
            const path = `./uploads/tour/${image}`;
            try {
                await fs.unlink(path);
            } catch (error) {
                
            }
            
        }
        if (result5.length > 0) {
            const image = result5[0].cover_img;
            const path = `./uploads/tour/${image}`;
            try {
                await fs.unlink(path);
            } catch (error) {
                
            }
            
        }

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

        res.status(200).json({ status: 200, message: 'Tour deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Something went wrong' });
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

module.exports = DeleteTour;
