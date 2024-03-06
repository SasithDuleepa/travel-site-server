const DB = require('../../config/database');

const UpdateCode = (req, res) => {
    const{codeId } = req.params;
    console.log(req.body);
    const { code,discount,exp_date } = req.body;
    if(code !==''  || discount !=='' || exp_date !==''){
        const query = `UPDATE promote_code SET promote_code='${code}', promote_code_discount='${discount}', promote_code_exp='${exp_date}' WHERE idpromote_code_id='${codeId}'`;
        DB.connection.query(query,(err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    }

};

module.exports = UpdateCode;