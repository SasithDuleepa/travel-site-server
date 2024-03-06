
const DB = require('./../../config/database');
const ToursSearch =(req,res) =>{
    const { tour } = req.params;
    // console.log(tour)

    try {
        const query = `SELECT * FROM tour WHERE tour_name LIKE '%${tour}%'`;
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


module.exports = ToursSearch;