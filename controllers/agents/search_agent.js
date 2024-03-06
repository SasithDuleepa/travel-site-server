const DB = require('./../../config/database');

const SearchAgent = (req, res) => {
    const {name} = req.params;
    if(name ){
        if(name !== ""){
            const sql = `SELECT * FROM user WHERE user_role='agent'  AND fname LIKE '%${name}%'`;
            DB.connection.query(sql, (err, result) => {
                if(err) throw err;
                if(result.length > 0){
                    res.status(200).json({
                        status: 200,
                        message: "success",
                        data: result
                    })
                }else{
                    res.status(404).json({
                        status: 404,
                        message: "No agent found"
                    })
                }
            })
            
        }else{
            const sql = `SELECT * FROM user WHERE user_role='agent'`;
            DB.connection.query(sql, (err, result) => {
                if(err) throw err;
                if(result.length > 0){
                    res.status(200).json({
                        status: 200,
                        message: "success",
                        data: result
                    })
                }else{
                    res.status(404).json({
                        status: 404,
                        message: "No agent found"
                    })
                }
            })
        }

    }
}

module.exports = SearchAgent;