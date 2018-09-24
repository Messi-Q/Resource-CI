import File from "../models/file1";
import express from "express";

let router = express.Router();

router.get('/:id', (req, res) => {
    File.forge()
        .where('id', '=', req.params.id)
        .fetch().then(resource => res.json({resource: resource}))
        .catch(err => res.status(500).json({errors: {global: "something went wrong"}}));
});

router.post('/', (req, res) => {
    const {userId, fileTitle, fileImage, fileDescription, fileReadPrice, fileRightPrice} = req.body;
    console.log(req.body);

    return File.forge({
        userId: userId,
        fileTitle: fileTitle,
        fileImage: fileImage,
        fileDescription: fileDescription,
        fileReadPrice: fileReadPrice,
        fileRightPrice: fileRightPrice
    }, {hasTimestamps: true}).save()
        .then(resource => res.json({resource: resource}))
        .catch(err => res.status(500).json({errors: {global: "something went wrong!"}}));
});

export default router;