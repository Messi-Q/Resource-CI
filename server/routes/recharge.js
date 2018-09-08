import express from 'express';
import User from '../models/user';

let router = express.Router();

router.put('/', (req, res) => {
    const {username, balance} = req.body;
    console.log(req.params.username);
    console.log(username, balance);
    User.forge()
        .where('username', '=', username)
        .save({
            balance:balance
        }, {patch: true}).then(balances => res.json({balances: balances}))
        .catch(err => res.status(500).json({errors: {global: "something went wrong!!"}}));
});

export default router;