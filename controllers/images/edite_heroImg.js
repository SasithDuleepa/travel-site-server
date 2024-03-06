const fs = require('fs').promises;

const EditeHeroImg = async(req,res) =>{
    console.log(req.body)
    let newImagePath = null;
    const existingImagePath = `uploads/images/${req.body.img}`; 

    if(req.file){
        console.log(req.file)
        newImagePath = `uploads/images/${req.file.originalname}`;
        try {
            await fs.unlink(existingImagePath); 
            await fs.rename(newImagePath, existingImagePath); 
            res.send('Image replaced successfully');
        } catch (error) {
            console.log(error);
        }

    }

}

module.exports = EditeHeroImg;