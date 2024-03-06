const DB = require('../../config/database');

const AddCode = (req,res) =>{
    console.log(req.body);
    const {user_id,code,discount,exp_date} = req.body;
    if(user_id !=='' || code !=='' || discount !=='' || exp_date !==''){
        const sql = `INSERT INTO promote_code (promote_code,promote_code_used_id,promote_code_discount,promote_code_exp,promote_code_generated_date) 
        VALUES ('${code}','${user_id}','${discount}','${exp_date}', NOW())`;
        DB.connection.query(sql,(err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    }
}
module.exports  = AddCode;