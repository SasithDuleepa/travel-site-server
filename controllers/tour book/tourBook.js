const DB = require('../../config/database');

const TourBook = (req,res) =>{
    console.log(req.body);
    const {tour_id,user_id,tour_price,hotel_type,passengers,start_date,booked_date,promote_code,promote_code_discount} = req.body;

    let code = null;
    if(promote_code !==''){
        code = promote_code;
    }

    if(tour_id ==='null' || user_id ==='null' || tour_price ==='null' || hotel_type ==='null' || passengers ==='null' || start_date ==='null'){
        res.status(400).json({message:'Bad Request'})
    }else{
        const query = `INSERT INTO tour_book (user_id,tour_id,price,hotel_type,passengers,start_day,booked_date,promote_code,promote_code_discount)
         VALUES ('${user_id}','${tour_id}',${tour_price},'${hotel_type}',${passengers},'${start_date}','${booked_date}','${code}','${promote_code_discount}')`;
         DB.connection.query(query,(err,result)=>{
             if(err){
                 res.status(400).json({error:err});
                  console.log(err)
             }else{
                 res.status(200).json({message:"Tour Booked Successfully"});
             }
         })
    }
}

module.exports = TourBook;




  