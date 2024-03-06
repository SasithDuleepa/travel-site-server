const DB = require('../../config/database');


const DeleteCode = (req, res) => {
    const { codeId } = req.params;
    console.log(codeId);
    DB.connection.query("DELETE FROM promote_code WHERE idpromote_code_id = ?", [codeId], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

module.exports = DeleteCode;