const DB = require('../../config/database');

const PendingDayTours = (req,res) =>{
    const{id} = req.params;
    console.log(id);
    if(id){
        const query = `
        SELECT daytour_book.* ,day_tour.day_tour, day_tour.img
         FROM daytour_book
         INNER JOIN day_tour ON daytour_book.daytour_id = day_tour.day_tour_id
         WHERE user_id = '${id}'`;
        DB.connection.query(query,(err,result)=>{
            if(err) throw err;
            res.send(result);
        })

    }
}

module.exports = PendingDayTours;