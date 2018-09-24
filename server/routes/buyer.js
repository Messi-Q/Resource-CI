import Buyer from "../models/Buy";
import express from "express";

let router = express.Router();

router.get('/:id', (req, res) => {
    Buyer.forge()
        .where('buyerId', '=', req.params.id)
        .fetchAll().then(resource => {res.json({buyerResources: resource});
        }).catch(err => res.status(500).json({errors: {global: "something went wrong"}}));
});

export default router;