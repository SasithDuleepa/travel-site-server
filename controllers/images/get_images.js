const path = require('path');

const TourImg = (req,res) => {
    res.sendFile(path.join(__dirname, `../../uploads/images/tour hero.png`))
}
const HomeHeroImg = (req,res) => {
    const{file} = req.params;
    console.log(file);
    if(file){
        res.sendFile(path.join(__dirname, `../../uploads/images/${file}`))
    }
}


module.exports = {
    TourImg,
    HomeHeroImg
}