const DB = require('../../config/database');
const fs = require('fs').promises;

const Delete = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Find image name
        const sql = 'SELECT tourcategory_img FROM tourcategory WHERE tourcategory_id = ?';
        const result = await executeQuery(sql, [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Tour category not found' });
        }

        const image = result[0].tourcategory_img;

        // Delete image from folder
        if (image) {
            const filePath = `./uploads/tour_category/${image}`;
            await fs.unlink(filePath);
        }

        // Delete from tourcategory
        const query = 'DELETE FROM tourcategory WHERE tourcategory_id = ?';
        await executeQuery(query, [id]);

        // Delete from tourcategory_tour
        const query_2 = 'DELETE FROM tourcategory_tour WHERE tourcategory_id = ?';
        await executeQuery(query_2, [id]);

        res.status(200).json({ message: 'Delete success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
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
