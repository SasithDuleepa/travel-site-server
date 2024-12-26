const multer = require('multer');

const upload = multer({
    storage:multer.memoryStorage({
        filename: function(req,file,cb){
        
            if(file){
                cb(null,`${file.fieldname}-${Date.now()}-${file.originalname}`);
          }
       }
    }),
    

});

module.exports = upload;


    