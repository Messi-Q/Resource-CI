import express from 'express';
import User from '../models/user';

let router = express.Router();

router.put('/', (req, res) => {
    const {username, totalBalance} = req.body;
    console.log(username, totalBalance);
    console.log(totalBalance, typeof(totalBalance));
    User.forge()
        .where('username', '=', username)
        .save({
            balance:totalBalance
        }, {patch: true}).then(balances => res.json({balances: balances}))
        .catch(err => res.status(500).json({errors: {global: "something went wrong!!"}}));
});

export default router;