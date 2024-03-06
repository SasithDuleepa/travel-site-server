const DB = require('./../../config/database')

const AllCategories = (req, res) =>{
    const query = "SELECT * FROM category";
    DB.connection.query(query, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
    
}

module.exports = AllCategories;