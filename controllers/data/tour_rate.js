
const DB = require('./../../config/database');

const EditeTourRate = (req,res) =>{
    const {tour_rate} = req.body;
    // console.log(tour_rate)
    if(tour_rate){
        const query = `UPDATE data SET tour_rate = ${tour_rate} WHERE data_id=1`;
        DB.connection.query(query,(err,result) =>{
            if(result) {
                res.status(200).send(result);
            }else{
                res.status(500).send(err)
            }
        })
    }else{
        res.status(400).send("Please enter a valid tour rate");
    }
}

const GetTourRate = (req,res) =>{
    const query = `SELECT data.tour_rate FROM data`;
    DB.connection.query(query,(err,result) =>{
        if(err) throw err;
        res.send(result);
    })
}

module.exports = {EditeTourRate,GetTourRate}    

