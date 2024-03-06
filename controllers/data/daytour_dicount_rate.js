const DB = require('./../../config/database');

const EditeDayTourDiscountRate = (req,res) =>{
    const {daytour_discount_rate} = req.body;
    // console.log(daytour_rate)
    if(daytour_discount_rate){
        const query = `UPDATE data SET daytour_discount_rate = ${daytour_discount_rate} WHERE data_id=1`;
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

const GetDayTourDiscountRate = (req,res) =>{
    const query = `SELECT data.daytour_discount_rate FROM data`;
    DB.connection.query(query,(err,result) =>{
        if(err) throw err;
        res.send(result);
    })
}

module.exports = {EditeDayTourDiscountRate,GetDayTourDiscountRate}  