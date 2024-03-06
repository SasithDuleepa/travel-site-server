const DB = require('../../config/database');
const fs = require('fs').promises;

const Delete = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            throw new Error('Bad Request: Missing ID parameter');
        }

        // Find image name
        const query = `SELECT img FROM day_tour WHERE day_tour_id = ?`;
        const result = await executeQuery(query, [id]);

        if (result.length > 0) {
            try {
                const image = result[0].img;
            const path = `./uploads/day_tour/${image}`;
            await fs.unlink(path);
            } catch (error) {
                
            }
            
        }

        // Delete from day_tour
        const sql = `DELETE FROM day_tour WHERE day_tour_id = ?`;
        await executeQuery(sql, [id]);

        // Delete from day_tour_places
        const sql1 = `DELETE FROM day_tour_places WHERE day_tour_id = ?`;
        await executeQuery(sql1, [id]);

        res.status(200).send({ status: 200, message: 'success' });
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
