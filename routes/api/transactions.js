const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Transaction = require('../../models/Transaction');
const User = require('../../models/User');
const {
    check,
    validationResult
} = require('express-validator');
//iex
const request = require('request');
const config = require('config');

//@route    GET api/transactions/all
//@desc     Get current user transactions
//@access   Private
router.get('/all', auth, async (req, res) => {
    try {
        const transactions = await Transaction.findOne({
            user: req.user.id
        }).populate('user', ['name']);

        //check for transactions
        if (!transactions) {
            return res.status(400).json({
                msg: 'There are no transactions for this user'
            });
        }

        //return transactions if there's one
        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route    POST api/transactions
//@desc     add transaction
//@access   Private
router.post('/', auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {} = req.body;

    // //build transaction object
    const transactionFields = {};
    transactionFields.user = req.user.id;

    try {
        let transacitons = await Transaction.findOne({
            user: req.user.id
        });

        if (transacitons) {
            //update
            transacitons = await Transaction.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: transactionFields
            }, {
                new: true
            });
            return res.json(transacitons);
        }
        console.log(transacitons);
        //create transaciton
        transacitons = new Transaction(transactionFields);
        await transacitons.save();

        res.json(transacitons);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;