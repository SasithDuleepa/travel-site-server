const renameFile = (file) => {
    if (!file) return null;

    const path = require('path');
    const ext = path.extname(file.originalname); // Get the file extension
    const newName = `${file.fieldname}-${Date.now()}${ext}`; // Generate a new name

    return {
        ...file,
        originalname: newName, // Attach renamed file name
    };
};

module.exports = renameFile ;
