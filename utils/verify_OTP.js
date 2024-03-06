const DB = require('../../config/database');

const VerifyOTP = (email, otp) => {
    
    const sql = `SELECT * FROM otp WHERE email = ? AND otp = ?`;
    return new Promise((resolve, reject) => {
        DB.query(sql, [email, otp], (err, result) => {
            if(err) reject(err);
            else resolve(result);
        })
    })


}

module.exports = VerifyOTP;