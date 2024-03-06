const DB = require('../../config/database');
const fs = require('fs').promises;
const DeleteMember =(req,res) =>{
    const {id} = req.params;
    console.log(id)

    const database = () =>{
        if( id){
            const query = `DELETE FROM team WHERE id = ${id}`;
            DB.connection.query(query,(err,result)=>{
                if(err){
                    console.log(err);
                    res.status(500).json({message:"internal server error"})
                }else{
                    res.status(200).json({message:"delete success"})
                }
            })
        } 

    }


    if(id){
        const query = `SELECT image FROM team WHERE id = ${id}`;
        DB.connection.query(query,(err,result) =>{
            if(err){
                console.log(err);
                res.status(500).json({message:"internal server error"})
            }
            else{
                if(result[0].image && result[0].image!=='null' ){
                    const image = result[0].image;
                    const path = `./uploads/team/${image}`;

                    try {
                        fs.unlink(path);
                        database()
                      } catch (error) {
                        database()
                      }
                }else{
                    database()
                }
            }
        })
       


    }
}

module.exports = DeleteMember;