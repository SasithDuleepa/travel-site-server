const DB = require('../../config/database');

const ToursAccToAgent = (req,res) =>{
    const {id} = req.params;
    if(id){
        const query = `SELECT tour_book.*,
        user.fname, user.email,
        tour.tour_name
FROM promote_code
INNER JOIN tour_book ON promote_code.promote_code = tour_book.promote_code
INNER JOIN travel.user ON user.user_id = tour_book.user_id
INNER JOIN travel.tour ON tour.tour_id = tour_book.tour_id
WHERE promote_code.promote_code_used_id = '${id}'`;

        DB.connection.query(query,(err,result)=>{
            if(err) throw err;
            res.send(result);
        })
        
    }

    
}

module.exports = ToursAccToAgent;