import multer from 'multer';
import fs from 'fs';
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // Specify the directory where files should be saved
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        // Save the file with its original name
        callback(null, file.originalname);
    }
});

const upload= multer({ storage });

export default upload;
