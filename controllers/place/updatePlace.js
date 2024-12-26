const DB = require('./../../config/database');
const fs = require('fs').promises;

const path = require('path');

const PlaceUpdate = async (req, res) => {
    const { id } = req.params;
    const { coverImgs, cardImg, deletedImgs, name,priority, lat, lng, time, fee, description, short } = req.body;

    // console.log(req.files)
    // console.log(req.body)

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

      const uploadDir = path.resolve('./uploads/places');

      // Save files
      const saveFile = (file, folder) =>
        new Promise((resolve, reject) => {
          const filePath = `${folder}/${file.originalname}`;
          fs.writeFile(filePath, file.buffer, (err) => {
            if (err) reject(err);
            else resolve(file.originalname);
          });
        });

        try {

        if(req.files.newCardImg && req.files.newCardImg[0] ){
            //save new file
            await Promise.all([
                saveFile(req.files.newCardImg[0], uploadDir),
              ]);

            //delete exist file
            const filePath = `./uploads/places/${cardImg}`;
            await fs.unlink(filePath);

            //add new file name to db
            await DB.connection.query('UPDATE place SET card_img=? WHERE place_id=?', [req.files.newCardImg[0].originalname, id]);
            cardImage_success++;


        }
        if(req.files.newCoverImg && req.files.newCoverImg[0] ){
            //save new file
            await Promise.all([
                saveFile(req.files.newCoverImg[0], uploadDir),
              ]);

            //delete exist file
            const filePath = `./uploads/places/${coverImgs}`;
            await fs.unlink(filePath);

            //add new file name to db
            await DB.connection.query('UPDATE place SET cover_img=? WHERE place_id=?', [req.files.newCoverImg[0].originalname, id]);
            coverImage_success++;
        }
        if(req.files.newImgs  ){
            //save new files
              await Promise.all(
                req.files.newImgs.map((img) =>{

                     saveFile(img, uploadDir)
                }
            )
              );
            //add new file names to db
            req.files.newImgs.map(async (img) => {
                await DB.connection.query('INSERT INTO place_img (place_id, img_name) VALUES (?, ?)', [id, img.originalname]);
                newImgs_success++;
            })
            

        }

        //delete exist files
        if(deletedImgs){
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
           
      }catch (error) {
        // console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
        

};

module.exports = PlaceUpdate;
