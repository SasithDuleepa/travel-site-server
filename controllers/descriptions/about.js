const DB = require('./../../config/database');

const GetAbout =(req,res) =>{
    const sql = "SELECT about FROM description WHERE id=1";
    DB.connection.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result);
    })

}

const UpdateAbout = (req,res) =>{
    const sql = "UPDATE description SET about=? WHERE id=1";
    DB.connection.query(sql,[req.body.about],(err,result) =>{
        if(err){
            res.status(500).send('error')
        }else{
            res.send(result);
        }
    })

}

module.exports = {GetAbout,UpdateAbout}