const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Portfolio = require('../../models/Portfolio');
const User = require('../../models/User');
const {
    check,
    validationResult
} = require('express-validator');

//@route    GET api/portfolio/me
//@desc     Get current user portfolio
//@access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({
            user: req.user.id
        }).populate('user', ['name']);

        //check for portfolio
        if (!portfolio) {
            return res.status(400).json({
                msg: 'There is no portfolio for this user'
            });
        }

        //return portfolio if there's one
        res.json(portfolio);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
//@route    POST api portfolio/stock
//@desc     add portfolio stock
//@access   Private
router.post('/portfolio/stock', [auth,
    [check('ticker', 'Ticker symbol is required').not().isEmpty(),
        check('shares', 'Number of shares symbol is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    //fix salePrice with api
    let salePrice = 0;

    const {
        ticker,
        shares
    } = req.body;


    const newStock = {
        ticker,
        shares,
        salePrice
    }


    //build portfolio object
    const portfolioFields = {};
    portfolioFields.user = req.user.id;
    if (!stock) portfolioFields.stock = [];
    if (stock) portfolioFields.stock = stock;

    try {
        const portfolio = await Portfolio.findOne({
            user: req.user.id
        });

        portfolio.stock.unshift(newStock);

        if (portfolio) {
            //update
            portfolio = await Portfolio.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: portfolioFields
            }, {
                new: true
            });
            return res.json(portfolio);
        }


        portfolio = new Portfolio(portfolioFields);
        await portfolio.save();

        res.json(portfolio);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

*/

module.exports = router;