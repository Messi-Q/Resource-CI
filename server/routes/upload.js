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

const uploadFolder = './uploads/';
createFolder(uploadFolder);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
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
    const fileInfo = req.file;
    console.log(fileInfo);
    res.json({fileInfo: fileInfo});
});

export default router;
