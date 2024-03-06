const DB = require('./../../config/database');

const GetVehicleAccToPassengers = (req,res)=>{
    const {id} = req.params;
    console.log(id);    

    if(id){
        const query = `SELECT * FROM vehicle WHERE min_passengers <= ${id} AND 
        max_passengers >= ${id}`;
        DB.connection.query(query,(err,result)=>{
            if(err) throw err;
            // console.log(result);
            
            res.send(result);
        
    }
    );

}

}
module.exports = GetVehicleAccToPassengers;