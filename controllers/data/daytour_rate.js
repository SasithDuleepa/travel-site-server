
const DB = require('./../../config/database');

const EditeDayTourRate = (req,res) =>{
    const {daytour_rate} = req.body;
    // console.log(daytour_rate)
    if(daytour_rate){
        const query = `UPDATE data SET daytour_rate = ${daytour_rate} WHERE data_id=1`;
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

const GetDayTourRate = (req,res) =>{
    const query = `SELECT data.daytour_rate FROM data`;
    DB.connection.query(query,(err,result) =>{
        if(err) throw err;
        res.send(result);
    })
}

module.exports = {EditeDayTourRate,GetDayTourRate}   