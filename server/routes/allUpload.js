import express from 'express';
import multer from 'multer';
import fs from 'fs';

let router = express.Router();

const createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

const uploadFolder = './allUploads/';
createFolder(uploadFolder);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './allUploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

router.post('/', upload.single('file'), (req, res, err) => {
    console.log('开始上传');
    if (err) {
        console.log(err)
    }
    console.dir(req.file);
    res.send({'ret_code': 0});
});

router.use((req, res) => {
    res.status(404).json({
        errors: {
            global: "Still working on it, Please try again later than when we implement it "
        }
    })
});

export default router;
