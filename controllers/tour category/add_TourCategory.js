const DB = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const Add = (req, res) => {
    const { TourCategory, Description, Tours } = req.body;
    const image = req.files[0] ? req.files[0].filename : '';

    if (TourCategory !== '' || Description !== '') {
        const Id = uuidv4();
        const Tour_Category_Id = Id.substr(0, 6);
        const tour_category_id = 'tc-' + Tour_Category_Id;

        const query_1 = `INSERT INTO tourcategory (tourcategory_id, tourcategory_name, tourcategory_description, tourcategory_img)
                        VALUES (?, ?, ?, ?)`;
        const values_1 = [tour_category_id, TourCategory, Description, image];

        DB.connection.query(query_1, values_1, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ status: 500, message: "Something went wrong" });
            }

            if (result) {
                const _id = uuidv4();
                let success = 0;

                const query_2 = `INSERT INTO tourcategory_tour (tourcategory_id, tour_id) VALUES (?, ?)`;

                Tours.forEach(async (element) => {
                    const values_2 = [tour_category_id, element];

                    try {
                        await executeQuery(query_2, values_2);
                        success++;

                        if (success === Tours.length) {
                            return res.status(200).send({ status: 200, message: 'Success' });
                        }
                    } catch (error) {
                        console.error(error);
                        return res.status(500).send({ status: 500, message: "Something went wrong" });
                    }
                });
            }
        });
    } else {
        res.status(400).send({ status: 400, message: 'TourCategory and Description are required' });
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

module.exports = Add;
