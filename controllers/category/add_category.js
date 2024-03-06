const DB = require('./../../config/database');
const { v4: uuidv4 } = require('uuid');

const AddCategory = (req,res) =>{
    console.log(req.body);
    const{category,description, places} = req.body;
    let img = "null"
    {req.files[0]? img = req.files[0].filename:img}
    // Generate a new UUID
    const Id = uuidv4();


    if(category&&description&&places&&img){
        const query = `INSERT INTO category (category_id,category_name,category_description,category_img) VALUES ('${Id}','${category}','${description}','${img}')`;
        DB.connection.query(query,(err,result)=>{
            if(err){
                res.status(400).send({message: "Something went wrong" })
                console.log(err)
            }else if(result){
                // console.log(result)


                let processed = 0;
                let Unprocessed = 0;
                if(places && places.length >0){
                    places.forEach(place => {
                        const placequery = `INSERT INTO category_places (category_id,place_id) VALUES ('${Id}','${place}')`;
                        DB.connection.query(placequery,(err,result)=>{
                            if(err){
                               
                                // console.log(err)
                                Unprocessed++;
                                if (Unprocessed === places.length) {
                                
                           
                                res.status(500).send({ message: "Something went wrong" });
                                }
                            }else if(result){
                                // console.log(result)
                               
                                processed++;
                                if (processed === places.length) {
                               
                               
                                res.status(200).send({ message: " Category added successfully " });
                                }
                            }
                        })
                        
                    })

                }
                
            }
        
    })
}else{
    res.status(400).send({message: "Something went wrong" })
}

}
    

module.exports = AddCategory;