const DB = require('../../config/database');

const GetHotels = (req,res) =>{
    const query = `SELECT * FROM hotel`;
    DB.connection.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
}

const GetLuxuryHotels = (req,res) =>{
    const query = `SELECT * FROM hotel WHERE hotel_category = '5 star'`;
    DB.connection.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
}

const GetSemiluxuryHotels = (req,res) =>{
    const query = `SELECT * FROM hotel WHERE hotel_category = '3 star/4 star'`;
    DB.connection.query(query,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
}
module.exports = {GetHotels,GetLuxuryHotels,GetSemiluxuryHotels}