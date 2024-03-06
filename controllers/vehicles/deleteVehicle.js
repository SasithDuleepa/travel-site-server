const DB = require('./../../config/database');

const Delete = (req,res) => {
    const {id} = req.params;
    if(id){
        const sql = `DELETE FROM vehicle WHERE _id = ${id}`;
        DB.connection.query(sql,(err,result) => {
            if(err) throw err;
            res.send(result);
        })
    }
 

}

module.exports = Delete;