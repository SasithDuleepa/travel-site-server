const multer = require('multer');

// multer config
// const storage = multer.diskStorage({
    
//     destination: function(req,file,cb){
      
//         cb(null,'./uploads/places');
//     },
//     filename: function(req,file,cb){
        
//         if(file){
//             cb(null,`${file.fieldname}-${Date.now()}-${file.originalname}`);
//         }
//         }
        
// });

// const upload = multer({storage:storage});

const upload = multer({
    storage:multer.memoryStorage({
        filename: function(req,file,cb){
        
            if(file){
                cb(null,`${file.fieldname}-${Date.now()}-${file.originalname}`);
          }
       }
    }),
    
    // limits: {
    //     fileSize: 10 * 1024 * 1024, // 10 MB limit
    //     files: 1, // Maximum 1 files
    //   },

});

module.exports = upload;


    