const DB = require('./../../config/database');

const DeletePlace =(req,res) =>{
    const {id} = req.params;
    // console.log(id);
    if(id){
        const query = `UPDATE place SET status='hide' WHERE place_id='${id}';`
        DB.connection.query(query,(err,result)=>{
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send(result);
            }
        })

    }
}

module.exports = DeletePlace;