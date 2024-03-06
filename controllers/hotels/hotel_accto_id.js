const DB = require('./../../config/database');

const GetHotelAcctoId =(req,res) =>{
    const {id} = req.params;
    if (id && id!== 'null'){
        const query = `SELECT * FROM hotel WHERE hotel_id = '${id}'`;

    DB.connection.query(query,(err,result)=>{
        if(err) {
            console.log(err)
        }else{
            res.send(result);
            console.log(result) 
        }
        
    })

    }
    
}

module.exports = GetHotelAcctoId;