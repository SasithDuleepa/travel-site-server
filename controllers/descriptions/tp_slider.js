const DB = require('./../../config/database');

const GetSlider =(req,res) =>{
    const sql = "SELECT tp_slider FROM description WHERE id=1";
    DB.connection.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result);
    })
}

const UpdateSlider = (req,res) =>{
    const sql = "UPDATE description SET tp_slider=? WHERE id=1";
    DB.connection.query(sql,[req.body.tp_slider],(err,result) =>{
        if(err){
            res.status(500).send('error')
        }else{
            res.send(result);
        }
    })

}

module.exports = {GetSlider,UpdateSlider}