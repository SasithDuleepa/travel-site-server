const DB = require('./../../config/database');

const DayTour = (req,res) =>{
    const query = `SELECT * FROM day_tour`;
    DB.connection.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
}
module.exports = DayTour;