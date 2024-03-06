const DB = require('./../../config/database');

const GetChairman =(req,res) =>{
    const sql = "SELECT chairman FROM description WHERE id=1";
    DB.connection.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result);
    })
}

const UpdateChairman = (req,res) =>{
    const sql = "UPDATE description SET chairman=? WHERE id=1";
    DB.connection.query(sql,req.body.chairman,(err,result) =>{
        if(err){
            res.status(500).send('error')
        }else{
            res.send(result);
        }
    })

}

module.exports = {GetChairman,UpdateChairman}