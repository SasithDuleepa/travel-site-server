const DB = require('./../../config/database');
const fs = require('fs').promises;

const path = require('path');
const renameFile = require('./../../utils/fileRename')

const PlaceUpdate = async (req, res) => {
    const { id } = req.params;
    const { coverImgs, cardImg, deletedImgs, name,priority, lat, lng, time, fee, description, short } = req.body;

    console.log(req.files)
    console.log(req.body)

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
          const NewCardImg = renameFile(req.files.newCardImg[0]);
          const filePath = `./uploads/places/${cardImg}`;
          console.log(NewCardImg)
            
            await Promise.all([
                saveFile(NewCardImg, uploadDir), //save new file
                async()=>{if(cardImg !== null){await fs.unlink(filePath)}},//delete exist file
                await DB.connection.query('UPDATE place SET card_img=? WHERE place_id=?', [NewCardImg.originalname, id]), //add new file name to db
                cardImage_success++
              ]);
        }
        if(req.files.newCoverImg && req.files.newCoverImg[0] ){
          const NewCoverImg = renameFile(req.files.newCoverImg[0]);
          const filePath = `./uploads/places/${coverImgs}`;
            
            await Promise.all([
                saveFile(NewCoverImg, uploadDir), //save new file
                async()=>{if(coverImgs !== null){await fs.unlink(filePath)}},//delete exist file
                await DB.connection.query('UPDATE place SET cover_img=? WHERE place_id=?', [NewCoverImg.originalname, id]), //add new file name to db
                coverImage_success++,
              ]);
        }
        if(req.files.newImgs  ){
            //save new files
              await Promise.all(
                req.files.newImgs.map((img) =>{
                  const NewImg = renameFile(img)
                     saveFile(NewImg, uploadDir)
                     DB.connection.query('INSERT INTO place_img (place_id, img_name) VALUES (?, ?)', [id, NewImg.originalname]);
                     newImgs_success++;
                }
            )
              );

            

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
