const DB = require('./../../config/database');

const Vehicles = (req,res) =>{
    const query  =  'SELECT * FROM vehicle'
    DB.connection.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
}

module.exports = Vehicles;