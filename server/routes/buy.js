import express from 'express';
import File from '../models/file';
import Buyer from '../models/Buyer';

let router = express.Router();

router.get('/', (req, res) => {
    File.forge().fetchAll().then(resource => {
        res.json({resource: resource});
    }).catch(err => res.status(500).json({errors: {global: "something went wrong"}}));
});

router.get('/:userId', (req, res) => {
    Buyer.forge()
        .where('buyerId', '=', req.params.userId)
        .fetchAll().then(buyResource => res.json({buyResources: buyResource}))
        .catch(err => res.status(500).json({errors: {global: "something went wrong"}}));
});

router.use((req, res) => {
    res.status(404).json({
        errors: {
            global: "Still working on it, Please try again later than when we implement it "
        }
    })
});

export default router;