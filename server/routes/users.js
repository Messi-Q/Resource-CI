import express from 'express';
import User from '../models/user';

let router = express.Router();

router.get('/:id', (req, res) => {
    User.forge()
        .where('id', '=', req.params.id)
        .fetch().then(user => res.json({user: user}))
        .catch(err => res.status(500).json({errors: {global: "something went wrong"}}));
});

export default router;