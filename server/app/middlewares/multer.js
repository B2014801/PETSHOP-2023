const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let { desPathUpload, discount } = req.body;
        if (discount) {
            desPathUpload = '/product';
        }
        if (!discount) {
            desPathUpload = '/brand';
        }
        if (desPathUpload) {
            cb(null, path.join(__dirname, `../store/img${desPathUpload}`)); // Using path.join() for file paths
        }
    },
    filename: function (req, file, cb) {
        cb(null, +Date.now() + file.originalname);
    },
});

// Create the Multer middleware
const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;
