// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');

// const storage = multer.diskStorage({
//   filename: function(req, file, cb) {
//     const filename = `product_${uuidv4()}${file.originalname.slice(file.originalname.lastIndexOf('.'))}`;
//     cb(null, filename);
//   }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;


const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Create upload directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer for local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
