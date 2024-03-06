const DB = require('./../../config/database');
const { v4: uuidv4 } = require('uuid');

const AddDayTour = (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const { daytour, description,organizingcost, distance, places, startDescription } = req.body;
  const img = req.files.file ? req.files.file[0].filename : null;
  const coverImg = req.files.coverImg ? req.files.coverImg[0].filename : null;

  const homeImg = req.files.homeImage ? req.files.homeImage[0].filename : null;

  const Id = uuidv4();

  if (daytour !== '' && description !== '' && places !== '' && distance !== '') {
    const mainQuery =
      'INSERT INTO day_tour (day_tour_id, day_tour, description, img, start_description, distance,organizing_cost,cover_img,home_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    DB.connection.query(
      mainQuery,
      [Id, daytour, description, img, startDescription, distance, organizingcost, coverImg,homeImg],
      (err, mainResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (places && places.length > 0) {
          let processed = 0;

          places.forEach((place) => {
            const placeQuery =
              'INSERT INTO day_tour_places (day_tour_id, place_id, description) VALUES (?, ?, ?)';

            DB.connection.query(
              placeQuery,
              [Id, place.place, place.placeDescription],
              (placeErr, placeResult) => {
                if (placeErr) {
                  console.error(placeErr);
                  return res.status(500).json({ message: 'Internal Server Error' });
                }

                processed++;

                if (processed === places.length) {
                  res.status(200).json({ message: 'Day Tour Added' });
                }
              }
            );
          });
        } else {
          res.status(200).json({ message: 'Day Tour Added' });
        }
      }
    );
  } else {
    res.status(400).json({ message: 'Invalid input data' });
  }
};

module.exports = AddDayTour;
