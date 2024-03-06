const DB = require('../../config/database');

const AddTeam = (req,res) => {
    const{name, position} = req.body;
    const img = req.file ? req.file.filename : null;
    console.log(img)

    if(name !=='' && position !== ''){
        const sql = `INSERT INTO team (name,position,image) VALUES ('${name}','${position}','${img}')`;
        DB.connection.query(sql,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({message:"internal server error"})
            }else{
                res.status(200).json({message:"team member added successfully"})
            }
        })
    }else{
        res.status(400).json({message:"please fill all the fields"})
    }
   
    
}

module.exports = AddTeam;