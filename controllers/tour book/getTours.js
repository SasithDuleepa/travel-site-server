const DB = require('../../config/database');

const GetTours = (req,res) =>{


        const query = `
        SELECT 
         tour_book.*,
         user.fname,user.email ,
         tour.tour_name   




        FROM travel.tour_book
        INNER JOIN travel.user  ON user.user_id = tour_book.user_id 
        INNER JOIN travel.tour ON tour.tour_id = tour_book.tour_id
         `;
        DB.connection.query(query,(err,result)=>{
            if(err) throw err;
            res.send(result);
;
        
        })


}

module.exports = GetTours;