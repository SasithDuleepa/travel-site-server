const DB = require('../../config/database');

const BookDayTour = (req,res) =>{
    // console.log(req.body);
    const {tour_id,passengers,date,total,user_id,start_from} = req.body;

    if(tour_id==='null' || passengers==='null' || date==='null' || total==='null' || user_id==='null'||
    tour_id==='' || passengers==='' || date==='' || total==='' || user_id===''){
        res.status(400).json({error:"Please fill all the fields"});
    }else{
        const query = `INSERT INTO daytour_book (user_id,daytour_id,tour_date,passengers,total,start_from)
         VALUES ('${user_id}','${tour_id}','${date}',${passengers},${total},'${start_from}')`; 
         DB.connection.query(query,(err,result)=>{
             if(err){
                 res.status(400).json({error:err});
                 console.log(err)
             }else{
                 res.status(200).json({message:"Tour Booked Successfully"});
             }
            })

    }
};

module.exports = BookDayTour;