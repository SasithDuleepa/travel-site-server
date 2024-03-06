const DB = require('./../../config/database');

const GetDTP =(req,res) =>{
    const sql = "SELECT daytour_package FROM description WHERE id=1";
    DB.connection.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result);
    })
}

const UpdateDTP = (req,res) =>{
    const sql = "UPDATE description SET daytour_package=? WHERE id=1";
    DB.connection.query(sql,req.body.daytour_package,(err,result) =>{
        if(err){
            res.status(500).send('error')
        }else{
            res.send(result);
        }
    })

}

module.exports = {GetDTP,UpdateDTP}