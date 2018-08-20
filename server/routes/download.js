import express from 'express';
import path from 'path';

let router = express.Router();

router.get('/:id', (req, res) => {
    const filepath = path.join(__dirname, "/download/" + req.file.name); // 文件存储的路径
    res.download(filepath);
});

export default router;