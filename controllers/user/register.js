const DB = require('../../config/database');
const CreateOTP = require('../../utils/create_OTP');

const Register = (req,res) => {
    const {fName,email,password} = req.body;

    if(fName==="" ||email==="" || password===""){
        res.status(400).send({message:"All fields are required" })
    }else{
        //check if email already exists
        const query_1 = `SELECT * FROM user WHERE email = '${email}';`
        DB.connection.query(query_1,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:"Error checking email" })
            }else if(result){
                console.log(result)
                if(result.length>0){
                    //can't register
                    res.status(400).send({message:"Email already exists"})
                }else{
                    //can register


                    CreateOTP(email)
                        .then((result) => {
                            console.log(result); 
                            res.status(200).send({message:"OTP sent successfully" })
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).send({message:"Error sending OTP" })
                        });


                    
            }
            }
})
    }

}




            
    




module.exports = Register;