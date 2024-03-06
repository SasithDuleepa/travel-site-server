

const DB = require('../../config/database');

const PendingTours = (req,res) =>{
    const{id} = req.params;
    console.log(id);
    if(id){
        const query = `
        SELECT tour_book.* , tour.tour_name, tour.tour_img
        FROM tour_book 
        INNER JOIN tour ON tour_book.tour_id = tour.tour_id
        WHERE user_id = '${id}'`;
        DB.connection.query(query,(err,result)=>{
            if(err) throw err;
            res.send(result);
        })

    }
}

module.exports = PendingTours;