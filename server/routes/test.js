import express from 'express';
import File from '../models/file1';

let router = express.Router();

router.get('/:userId', (req, res) => {
    File.forge()
        .where('userId', '=', req.params.userId)
        .fetchAll().then(resource => res.json({testResources: resource}))
        .catch(err => res.status(500).json({errors: {global: "something went wrong"}}));
});

export default router;