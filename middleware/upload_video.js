// uploadVideo.js
import multer from 'multer';
import path from'path';


// Create an instance of multer to handle the file upload
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/upload/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
