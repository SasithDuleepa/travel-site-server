const DB = require('./../../config/database');

const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        DB.connection.query(query, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const AddPopularPlace = async (req, res) => {
    const data = req.body;
    
    if (data.length > 0) {
        let success = 0;
        let fail = 0;

        try {
            for (const element of data) {
                const query = "INSERT INTO popular_place(place_id) VALUES(?)";
                await executeQuery(query, [element.place_id]);
                success++;
            }

            res.status(200).send('success');
        } catch (error) {
            console.error(error);
            res.status(500).send('fail');
        }
    } else {
        res.status(400).send('No data provided');
    }
};

module.exports = AddPopularPlace;
