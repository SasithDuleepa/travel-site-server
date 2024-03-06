const DB = require('./../../config/database');
const Update = (req,res) =>{
    const {id} = req.params;
    const{vehicle_type,min_passengers,max_passengers,rate} = req.body;
    
    const sql = "UPDATE vehicle SET vehicle_type=?,min_passengers=?,max_passengers=?,rate=? WHERE _id=?";
    DB.connection.query(sql,[vehicle_type,min_passengers,max_passengers,rate,id],(err,result)=>{
        if(err) throw err;
        res.send(result);
    

    
}
    );
}

module.exports = Update;