const DB = require('./../../config/database');

const GetTP =(req,res) =>{
    const sql = "SELECT tour_package FROM description WHERE id=1";
    DB.connection.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result);
    })
}

const UpdateTP = (req,res) =>{
    const sql = "UPDATE description SET tour_package = ? WHERE id=1";
    DB.connection.query(sql,req.body.tour_package,(err,result) =>{
        if(err){
            res.status(500).send('error')
        }else{
            res.send(result);
        }
    })

}

module.exports = {GetTP,UpdateTP}