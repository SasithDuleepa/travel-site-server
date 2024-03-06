const DB = require('./../../config/database');

const DayTourSearch =(req,res) =>{
    const { tour } = req.params;

    try {
        const query = `SELECT * FROM day_tour WHERE day_tour LIKE '%${tour}%'`;
        DB.connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.json({status:400 , message:"not found"})
                
    
            } else {
                res.json({status:200 , message:"found", data:result})
                
            }
        }
        );
    } catch (error) {
        res.json({status:400 , message:"not found"})
    }

}

module.exports = DayTourSearch;