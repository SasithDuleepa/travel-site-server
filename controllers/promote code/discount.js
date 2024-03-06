const DB = require('../../config/database');

const CodeDiscount = (req,res ) =>{
    const {code} = req.params;
    console.log(code);
    if(code){

        const sql = `SELECT promote_code_discount FROM promote_code WHERE promote_code = '${code}'`;
        DB.connection.query(sql,(err,result)=>{
            if(result){
                if(result.length > 0){
                    res.send(result[0].promote_code_discount)
                }else{
                    res.status(200).send('0')
                }
            }else{
                res.status(200).send('0')

            }

            
        })

    }
}

module.exports = CodeDiscount;