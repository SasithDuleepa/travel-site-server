
const DB = require('./../../config/database');

const Add = (req,res) =>{
    console.log(req.body)
    const{vehicleType,minPassengers,maxPassengers,ratePerKm} = req.body;

    if(vehicleType!=='' ||minPassengers !=="" || maxPassengers!=='' || ratePerKm!==''){
        const sql = "INSERT INTO vehicle (vehicle_type,min_passengers,max_passengers,rate) VALUES (?,?,?,?)";
        DB.connection.query(sql,[vehicleType,minPassengers,maxPassengers,ratePerKm],(err,result)=>{
            if(err) throw err;
            console.log(result);
            res.send(result);
        })

    }
}

module.exports = Add;