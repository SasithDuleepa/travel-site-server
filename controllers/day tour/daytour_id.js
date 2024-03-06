const DB = require('../../config/database');
const DayTourAccToId = (req,res) =>{
    const { id } = req.params;
    // console.log(id)
    if(id){
        try {
            const sql = `SELECT * FROM day_tour WHERE day_tour_id = '${id}'`;
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

module.exports = DayTourAccToId;