import express from "express";

let exec = require('child_process').exec;
let router = express.Router();

router.post('/', (req, res) => {
    const {input, identity, output} = req.body;  //input:文件路径   identity:验证ID(网站名-用户名)
    exec('python /home/jion1/nodejsworkspace/redux-login/waterMark/image_watermark_extract.py ' + input + ' ' + identity, function (error, stdout, stderr) {
        if (stdout.length > 1) {
            console.log('you offer args:', stdout);
            res.send({'ret_code': 0});
        } else {
            console.log('you don\'t offer args');
        }
        if (error) {
            console.info('stderr : ' + stderr);
        }
    });
});

export default router;