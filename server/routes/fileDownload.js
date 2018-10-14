import express from 'express';
import fs from 'fs';

let router = express.Router();

router.get('/:fileName', (req, res, next) => {
    const fileName = req.params.fileName;
    const load = "/home/jion1/nodejsworkspace/redux-login/uploads/";
    const loads = load + fileName;  // 文件存储的路径
    const name = load + 'out-' + fileName;

    fs.readFile(loads, 'utf-8', function (err, data) {
        if (err) {
            console.error(err);
        } else {
            fs.writeFile(name, data, 'utf-8', function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("file writes success!!")
                }
            });
        }
    })

});

export default router;