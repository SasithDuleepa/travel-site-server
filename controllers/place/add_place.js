const DB = require('./../../config/database');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const AddPlace = async (req, res) => {
  const { name, priority, description, time, fee, lat, lng, shortDescription } = req.body;

  // Validate required fields
  if (!name || !time || !fee || !lat || !lng || !shortDescription) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if place already exists
    const placeQuery = `SELECT * FROM place WHERE place_name = ?`;
    DB.connection.query(placeQuery, [name], async (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length > 0) {
        return res.status(409).json({ message: "Place with the same name already exists" });
      }

      // Generate a unique ID for the place
      const Id = uuidv4();

      // Ensure upload directories exist
      const uploadDir = path.resolve('./uploads/places');
      // if (!fs.existsSync(uploadDir)) {
      //   fs.mkdirSync(uploadDir, { recursive: true });
      // }

      // Save files
      const saveFile = (file, folder) =>
        new Promise((resolve, reject) => {
          const filePath = `${folder}/${file.originalname}`;
          fs.writeFile(filePath, file.buffer, (err) => {
            if (err) reject(err);
            else resolve(file.originalname);
          });
        });

      const cardImg = req.files.cardImg[0];
      const coverImg = req.files.coverImg[0];
      const placeImgs = req.files.placeImgs;

      try {
        const [cardImgName, coverImgName] = await Promise.all([
          saveFile(cardImg, uploadDir),
          saveFile(coverImg, uploadDir),
        ]);

        await Promise.all(
          placeImgs.map((img) => saveFile(img, uploadDir))
        );

        // Insert place data into the database
        const insertQuery = `INSERT INTO place 
          (place_id, place_name, priority, place_description, place_lat, place_lng, visit_time, visiting_fee, short_description, card_img, cover_img, status) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`;

        DB.connection.query(
          insertQuery,
          [Id, name, priority, description, lat, lng, time, fee, shortDescription, cardImgName, coverImgName],
          (insertErr) => {
            if (insertErr) {
              console.error("Error inserting place:", insertErr);
              return res.status(500).json({ message: "Error adding place" });
            }

            // Insert place images into the database
            const imageQueries = placeImgs.map(
              (img) =>
                new Promise((resolve, reject) => {
                  const imgQuery = `INSERT INTO place_img (img_name, place_id) VALUES (?, ?)`;
                  DB.connection.query(imgQuery, [img.originalname, Id], (imgErr) => {
                    if (imgErr) reject(imgErr);
                    else resolve();
                  });
                })
            );

            Promise.all(imageQueries)
              .then(() => {
                return res.status(200).json({ message: "Place added successfully" });
              })
              .catch((imgErr) => {
                console.error("Error adding images:", imgErr);
                return res.status(500).json({ message: "Error adding place images" });
              });
          }
        );
      } catch (fileErr) {
        console.error("File handling error:", fileErr);
        return res.status(500).json({ message: "Error saving files" });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
};

module.exports = AddPlace;
