const DB = require('../../config/database');

const RequestUpdate = (req,res) =>{
    const{id} = req.params; 
    console.log(id)

    if(id){
        const query = `UPDATE request SET status='accept' WHERE _id = '${id}'`;
        DB.connection.query(query,id,(err,result)=>{
            if(err){
                res.status(500).send('error')
            }else if(result){
                res.status(200).send('success')
            }
        })
    }
}

module.exports = RequestUpdate;