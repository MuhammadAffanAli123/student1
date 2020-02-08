const multer = require('multer');

/**
 * Configure multer diskstorage
 */

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log("file-management::destination");
        callback(null, 'backend/files');
    },
    filename: (req, file, callback) => {
        console.log("file-management::filename");
        const name = file.originalname.toLowerCase().split(' ').join('-');
        console.log("file name: ", name);
        const ext = "TODO";//MIME_TYPE_MAP[file.mimetype];
        console.log("file ext: ", ext);

        callback(null, Date.now() + '-'+ name);
    }
});

module.exports = multer({storage: storage}).single('sequence');
