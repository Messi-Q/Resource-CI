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

router.put('/:id', (req, res) => {
    const {userBuyId, restBalance} = req.body;
    console.log(req.body);

    User.forge()
        .where('id', '=', userBuyId)
        .save({
            balance:restBalance
        }, {patch: true}).then(balances => res.json({balances: balances}))
        .catch(err => res.status(500).json({errors: {global: "something went wrong!!"}}));
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    User.forge()
        .where('id', '=', req.params.id)
        .fetch().then(owner => res.json({owner: owner}))
        .catch(err => res.status(500).json({errors: {global: "something went wrong"}}));
});

export default router;