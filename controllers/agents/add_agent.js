
const DB = require('./../../config/database');
const { v4: uuidv4 } = require('uuid');

const AddAgent = (req,res) => {
    const { name, email, password } = req.body;
    const Id = uuidv4();
                const _Id = Id.substr(0, 6);
                const agent = 'agent-' + _Id;
    console.log(name, email, password);
    if(name!=="" && email!=="" && password!==""){

        //find user name exists
        const query1 = "SELECT * FROM user WHERE fname = ?";
        const values1 = [name];
        DB.connection.query(query1, values1, (err, result) => {
            if (err) {

                res.json({
                    status:400,
                    message:"Error checking email"
                })
                
            }
            if (result.length > 0) {
                // User with the same name already exists
                return res.status(409).json({ message: "User with the same name already exists" });
            }else{
                const query = "INSERT INTO user (user_id,fname, email, password,user_role) VALUES (?,?,?,?,?)";
                const values = [agent, name, email, password, 'agent'];
                DB.connection.query(query, values, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Error adding agent" });
                    }
                    return res.status(200).json({ message: "Agent added successfully" });
                })
            }
        })
    






    }else{
res.status(400).json({ message: "All field required" });
    }
}

module.exports = AddAgent;