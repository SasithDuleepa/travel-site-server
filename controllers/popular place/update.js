
const DB = require('./../../config/database');
const UpdatePopularPlaces =(req,res) =>{

    let data = req.body;

    let success = 0;
    let failed = 0;

    if(data){
        //clear table
        const query = `DELETE  FROM popular_place`
        DB.connection.query(query,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).send(err)
            }else if(result){
                if(data.length>0){
                    data.forEach(element => {
                        const query = `INSERT INTO popular_place (place_id) VALUES ('${element.place_id}')`
                        DB.connection.query(query,(err,result)=>{
                            if(err){
                                console.log(err)
                                failed++
                            
                            }else if(result){
                                success++
                                
                            }
                        })
            
                    })

                }


                


                if(failed>0){
                    res.status(500).send(err)
                }else{
                    res.status(200).send('success')
                }
            }
        })
        
    }
}
module.exports = UpdatePopularPlaces;