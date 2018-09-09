import express from 'express';
import User from '../models/user';

let router = express.Router();

router.put('/:id', (req, res) => {
    const {userId, totalBalance} = req.body;
    console.log(req.body);

    User.forge()
        .where('id', '=', userId)
        .save({
            balance:totalBalance
        }, {patch: true}).then(balances => res.json({balances: balances}))
        .catch(err => res.status(500).json({errors: {global: "something went wrong!!"}}));
});

export default router;