const DB = require('./../../config/database');

const GetPlace = (req,res) => {
    const { place } = req.params;

    if(place){
        const query = `SELECT * FROM place WHERE place_id = '${place}'`;
        DB.connection.query(query,(err,result) => {
           if(err){
            res.send('error');
           }else if (result){
            res.send(result);
           }
    
}
        )
    }
    else{
        res.send("Please enter a valid place");
    }
}
module.exports = GetPlace;


