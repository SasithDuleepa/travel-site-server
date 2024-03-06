const DB = require('../../config/database');

const DayTourPlaces = (req,res) => {
    const { id } = req.params;
    // console.log(id)
    if(id){
        try {
            const sql =`

            SELECT
                p.*,
                dtp.*
            FROM
                place p
            JOIN
                day_tour_places dtp ON p.place_id = dtp.place_id
            WHERE
                dtp.day_tour_id = '${id}'`;
            DB.connection.query(sql,(err,result)=>{
                if(err) throw err;
                res.send(result)
                // console.log(result)
            
            }
            )
        } catch (error) {
            
        }
    }
}

module.exports = DayTourPlaces;

