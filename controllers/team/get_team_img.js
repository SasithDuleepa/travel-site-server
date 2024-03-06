const path = require('path');


const Image = (req,res) =>{
    const {id} = req.params;
    console.log(id);
    if(id){
        res.sendFile(path.join(__dirname, `../../uploads/team/${id}`))
    }
}

module.exports = Image;