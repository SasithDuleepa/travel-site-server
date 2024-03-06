const DB = require('./../../config/database');

const GetPopularPlaces =(req,res) =>{
    const sql = "SELECT popular_places FROM description WHERE id=1";
    DB.connection.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result);
    })
}

const UpdatePopularPlaces = (req,res) =>{
    const sql = "UPDATE description SET popular_places = ? WHERE id=1";
    DB.connection.query(sql,req.body.popular_places,(err,result) =>{
        if(err){
            res.status(500).send('error')
        }else{
            res.send(result);
        }
    })

}

module.exports = {GetPopularPlaces,UpdatePopularPlaces}