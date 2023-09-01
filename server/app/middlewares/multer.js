const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../store/img')); // Using path.join() for file paths
    },
    filename: function (req, file, cb) {
        cb(null, +Date.now() + file.originalname);
    },
});

// Create the Multer middleware
const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;
