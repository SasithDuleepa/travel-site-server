const DB = require('../../config/database');

const AddRequest =(req,res)=>{
    const { name, email, contact, country, message } = req.body;
    
    if (name !== '' && email !== '' && contact !== '' && country !== '' ) {
        const query = "INSERT INTO `request` (name, email, contact, country, message, status, date) VALUES (?, ?, ?, ?, ?, 'pending', NOW())";
        
        DB.connection.query(query, [name, email, contact, country, message], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({ status: 500, message: 'error' });
            } else {
                res.status(200).send({ status: 200, message: 'success' });
            }
        });
    }
};

module.exports = AddRequest;