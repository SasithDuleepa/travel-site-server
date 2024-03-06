const DB = require('../../config/database');

const PendingHandle = (req,res) =>{
    const{id} = req.params;
    console.log(id);

    if(id){
        const query = `UPDATE contact_request SET status = 'done' WHERE _id = ${id}`;
        DB.connection.query(query,(err,result)=>{
            if(err){
                console.log(err);
                res.status(500).send('eror')
            }else{
                console.log(result);
                res.status(200).send('done');
                // res.redirect('/admin/pending');
            }
        })

    }
}

module.exports = PendingHandle;