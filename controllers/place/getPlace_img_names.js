
const DB = require('./../../config/database');
const Place_img_Names = (req,res) =>{
    const { place } = req.params;
    const query = `SELECT * FROM place_img WHERE place_id = '${place}'`;

    DB.connection.query(query,(err,result) =>{
        if(err){
            res.send('error')
        }else if (result)
        res.send(result);
        
    })
}

module.exports = Place_img_Names;