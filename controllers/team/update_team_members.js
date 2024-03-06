const DB = require('../../config/database');
const fs = require('fs').promises;


const UpdateTeam =async (req,res) =>{
    const { id }= req.params;
    const{name, position,image} = req.body;
    const img = req.file ? req.file.filename : image;

    const database = () =>{
        if( id && name && position ){
            const query = `UPDATE team SET name = '${name}', position = '${position}', image = '${img}' WHERE id = ${id}`;
            DB.connection.query(query,(err,result)=>{
                if(err){
                    console.log(err);
                    res.status(500).json({message:"internal server error"})
                }else{
                    res.status(200).json({message:"update success"})
                }
            })
        } 

    }

    if(req.file){
        const query = `SELECT image FROM team WHERE id = ${id}`;
        DB.connection.query(query,(err,result)=>{
            if(err){
                console.log(err);
                res.status(500).json({message:"internal server error"})
            }else{
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
    }else{
        database()
    }



    

      


}

module.exports = UpdateTeam;    