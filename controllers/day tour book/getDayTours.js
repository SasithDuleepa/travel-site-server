const DB = require('../../config/database');

const GetDayTours = (req,res) =>{


        const query = `
        SELECT daytour_book.*, user.fname,user.email ,day_tour.day_tour
        FROM travel.daytour_book
        INNER JOIN travel.user ON user.user_id = daytour_book.user_id
        INNER JOIN travel.day_tour ON day_tour.day_tour_id = daytour_book.daytour_id
         `;
        DB.connection.query(query,(err,result)=>{
            if(err) throw err;
            res.send(result);
;
        
        })


}

module.exports = GetDayTours