import express from 'express';
import File from '../models/file';

let router = express.Router();

router.get('/:id', (req, res) => {
    File.forge()
        .where('id', '=', req.params.id)
        .fetch().then(owner1 => res.json({owner1: owner1}))
        .catch(err => res.status(500).json({errors: {global: "something went wrong"}}));
});

export default router;