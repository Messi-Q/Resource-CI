import express from 'express';
import fs from 'fs';

let router = express.Router();

router.get('/:fileName', (req, res, next) => {
    const fileName = req.params.fileName;
    const upload = "/home/jion1/nodejsworkspace/redux-login/uploads/";
    const uploads = upload + fileName;  // 文件存储的路径
    const download = "/home/jion1/nodejsworkspace/redux-login/download/";
    const downloads = download + 'download-' + fileName;
    const downloadName = 'download-' + fileName;
    const confirmPath = "/home/jion1/nodejsworkspace/redux-login/confirm/";

    fs.readFile(uploads, 'binary', function (err, data) {
        if (err) {
            console.error(err);
        } else {
            fs.writeFile(downloads, data, 'binary', function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("picture writes success!!");
                    res.json({
                        success:
                            {
                                message: "success",
                                originalName: fileName,
                                downloadName: downloadName,
                                originalPath: uploads,
                                downloadPath: downloads,
                                confirmPath: confirmPath
                            }
                    })
                }
            });
        }
    })

});

export default router;