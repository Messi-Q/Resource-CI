import express from 'express';
import path from 'path';

let router = express.Router();

router.get('/:id', (req, res) => {
    const filepath = path.join(__dirname, "/download/"); // 文件存储的路径
    console.log(filepath);
    res.download(filepath);
});

export default router;