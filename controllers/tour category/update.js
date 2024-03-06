const DB = require('../../config/database');
const fs = require('fs').promises;

const UpdateTourCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description, image, file, Tours } = req.body;
    console.log(req.files);


    try {
        if (req.files) {
            if (image === 'null') {
                // Update image
                const query_1 = `UPDATE tourcategory SET tourcategory_img = ? WHERE tourcategory_id = ?`;
                await executeQuery(query_1, [req.files[0].filename, id]);
            } else {
                // Delete existing file
                const filePath = `./uploads/tour_category/${image}`;
                
                if(req.files[0].filename){
                    console.log('unlink called!!')
                    await fs.unlink(filePath);
                }

                // Update image
                const query_2 = `UPDATE tourcategory SET tourcategory_img = ? WHERE tourcategory_id = ?`;
                await executeQuery(query_2, [req.files[0].filename, id]);
            }
        }


        // Update name and description
        const query = `UPDATE tourcategory SET tourcategory_name = ?, tourcategory_description = ? WHERE tourcategory_id = ?`;
        await executeQuery(query, [name, description, id]);

        if (Tours.length > 0) {
            // Delete existing tours
            const query_3 = `DELETE FROM tourcategory_tour WHERE tourcategory_id = ?`;
            await executeQuery(query_3, [id]);
            console.log('Delete successful');

            // Add new tours
            for (const tour of Tours) {
                const query_4 = `INSERT INTO tourcategory_tour (tourcategory_id, tour_id) VALUES (?, ?)`;
                await executeQuery(query_4, [id, tour]);
            }
        }

        console.log('Update successful');
        res.status(200).send({ status: 200, message: 'Update successful' });
    } catch (error) {
         // Update name and description
         const query = `UPDATE tourcategory SET tourcategory_name = ?, tourcategory_description = ? WHERE tourcategory_id = ?`;
         await executeQuery(query, [name, description, id]);
 
         if (Tours.length > 0) {
             // Delete existing tours
             const query_3 = `DELETE FROM tourcategory_tour WHERE tourcategory_id = ?`;
             await executeQuery(query_3, [id]);
             console.log('Delete successful');
 
             // Add new tours
             for (const tour of Tours) {
                 const query_4 = `INSERT INTO tourcategory_tour (tourcategory_id, tour_id) VALUES (?, ?)`;
                 await executeQuery(query_4, [id, tour]);
             }
         }
 
         console.log('Update successful');
         res.status(200).send({ status: 200, message: 'Update successful' });
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

module.exports = UpdateTourCategory;
