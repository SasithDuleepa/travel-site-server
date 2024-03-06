const path = require('path');
const fs = require('fs').promises;


const EditeTourImg =async (req,res) =>{
    let newImagePath = null;
    const existingImagePath = `uploads/images/tour hero.png`; 

    if(req.file){
        newImagePath = `uploads/images/${req.file.originalname}`;


        try {
            await fs.unlink(existingImagePath); 
            await fs.rename(newImagePath, existingImagePath); 
            res.send('Image replaced successfully');
        } catch (error) {
            // res.status(200).send('Error replacing image');
            console.log(error);
        }
    }

}

module.exports = {
    EditeTourImg
}