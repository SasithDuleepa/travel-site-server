const DB = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

const SaveUser = (req,res) => {
    // console.log(req.body)
    const {fName,email,password,otp} = req.body;


    //check otp
    if(otp && email){
        console.log('otp and email have')
        const sql = `SELECT * FROM otp WHERE email = '${email}'`;
        DB.connection.query(sql,(err,result) => {
            if(err){
                console.log(err)
                res.status(500).send({message:"Error checking OTP" })
            }else if(result.length>0){
                if(result[result.length - 1].otp == otp){
                    console.log("OTP verified")
                    // res.status(200).send({message:"OTP verified" });

                    //clear otp
                    const sql = `DELETE FROM otp WHERE email = '${email}'`
                    DB.connection.query(sql,(err,result) => {
                        if(err){
                            console.log(err)
                        }else if(result){
                            console.log("OTP cleared")
                        }
                    })




                    if(fName && email && password){
                        const userId = uuidv4();
                        const sql =`INSERT INTO user (user_id,fname,email,password,user_role) VALUES ('${userId}','${fName}','${email}','${password}','user')`
                        DB.connection.query(sql,(err,result) => {
                            if(err){
                                console.log(err)
                
                                res.status(400).send({message:"Error saving user" })
                            }else if(result){
                                res.status(200).send({message:"User saved successfully"})
                            }
                        })
                    }







                }else{

                    res.status(400).send(err)
                }
            }else{
                console.log("No OTP found")
                res.status(400).send({message:"No OTP found" })
            }
        })
    }





    
   
}

module.exports = SaveUser;