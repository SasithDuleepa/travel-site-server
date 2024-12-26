const DB = require('../../config/database');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const AddTourCategory =async (req, res) => {
    const { packageName, description, price, dayData, distance ,days} = req.body;
    console.log(req.files);
    let cardImg = req.files.coverImage[0].originalname || null;
    let coverImg = req.files.coverImage[0].originalname || null;
    const TourPackegeId = uuidv4();
    const Tour_Packeg_Id = TourPackegeId.substr(0, 6);
    const tour_packeg_id = 'tp-' + Tour_Packeg_Id;

    const uploadDir = path.resolve('./uploads/tour');
    // Save files
    const saveFile = (file, folder) =>
        new Promise((resolve, reject) => {
          const filePath = `${folder}/${file.originalname}`;
          fs.writeFile(filePath, file.buffer, (err) => {
            if (err) reject(err);
            else resolve(file.originalname);
          });
        });


        if(req.files.coverImage[0] ){
            await Promise.all([
                saveFile(req.files.coverImage[0], uploadDir),
              ]);
        }

        if(req.files.cardImage[0] ){
            await Promise.all([
                saveFile(req.files.cardImage[0], uploadDir),
              ]);
        }

    if (packageName !== '' || description !== ''  || dayData !== '') {
        const query_1 = `INSERT INTO tour (tour_id, tour_name, tour_description,  tour_img, distance,cover_img,days) 
                        VALUES (?,  ?, ?, ?, ?, ?, ?)`;
        const values_1 = [tour_packeg_id, packageName, description,  cardImg, distance, coverImg,days];

        DB.connection.query(query_1, values_1, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ status: 400, message: 'Something went wrong' });
            }

            // Days
            let dayDataArray = JSON.parse(dayData);
            console.log(dayDataArray);  
            dayDataArray.forEach(async (element) => {
                const DayId = uuidv4();
                const Day_Id = DayId.substr(0, 6);
                const day_id = 'tp-day-' + Day_Id;

                const query_2 = `INSERT INTO tour_date (tour_date_id, tour_id, tour_date, luxary_hotel, semi_hotel, start_description)
                                VALUES (?, ?, ?, ?, ?, ?)`;
                const values_2 = [day_id, tour_packeg_id, element.day, element.luxury_id, element.semiluxury_id, element.startdescription];

                try {
                    await executeQuery(query_2, values_2);

                    // Places
                    for (const place of element.places) {
                        const query_3 = `INSERT INTO tour_places (tour_date_id, tour_places_id, tour_place_description)
                                        VALUES (?, ?, ?)`;
                        const values_3 = [day_id, place.placeId, place.description_place];

                        await executeQuery(query_3, values_3);
                    }
                } catch (error) {
                    console.error(error);
                    return res.status(400).json({ status: 400, message: 'Something went wrong' });
                }
            });

            res.status(200).json({ status: 200, message: 'Tour package added successfully' });
        });
    } else {
        res.status(400).json({ status: 400, message: 'Invalid input parameters' });
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

module.exports = AddTourCategory;
