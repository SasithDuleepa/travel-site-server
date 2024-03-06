const DB = require('../../config/database');

const SearchCategory = (req,res) =>{

    const {category} = req.params;
    const sql = `SELECT * FROM tourcategory WHERE tourcategory_name LIKE '%${category}%'`;
    DB.connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
        console.log(result)
    })

}

module.exports = SearchCategory;