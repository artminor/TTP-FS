const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Portfolio = require('../../models/Portfolio');
const User = require('../../models/User');
const {
    check,
    validationResult
} = require('express-validator');
//iex
const request = require('request');
const config = require('config');
// const iexAPI = 'https://cloud.iexapis.com/stable';
//pk_8681342999224df5bd6d757c1bd69566

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


//@route    POST api/portfolio
//@desc     add or update portfolio
//@access   Private
router.post('/', auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {} = req.body;

    // //build portfolio object
    const portfolioFields = {};
    portfolioFields.user = req.user.id;

    try {
        let portfolio = await Portfolio.findOne({
            user: req.user.id
        });

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
        console.log(portfolio);
        //create portfolio
        portfolio = new Portfolio(portfolioFields);
        await portfolio.save();

        res.json(portfolio);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route    GET api/portfolio/user/:user_id
// @desc     Get portfolio by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
        //find user by id with id from url
        const portfolio = await Portfolio.findOne({
            user: req.params.user_id
        }).populate('user', ['name']);

        if (!portfolio) return res.status(400).json({
            msg: 'portfolio not found'
        });

        res.json(portfolio);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({
                msg: 'portfolio not found'
            });
        }
        res.status(500).send('Server Error');
    }
});

//@route    PUT api/portfolio/stock
//@desc     add stock
//@access   Private
router.put('/stock', [auth, [
    check('ticker', 'ticker symbol is required').not().isEmpty(),
    check('shares', 'number of shares is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        ticker,
        shares
    } = req.body;

    //pull stock info from api
    let buyStock = {
        uri: `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_8681342999224df5bd6d757c1bd69566`,
        method: 'GET'
    };


    request(buyStock, async (error, response, body) => {
        if (error) console.error(error);

        if (response.statusCode !== 200) {
            return response.status(404).json({
                msg: 'No stock found for such ticker'
            });
        }

        const obj = JSON.parse(body);
        let open;
        obj.open == null ?
            open = obj.previousClose : open = Number(obj.open.toFixed(2));
        let salePrice = Number(obj.latestPrice.toFixed(2));
        let companyName = obj.companyName;

        let newStock = {
            companyName,
            ticker,
            shares,
            salePrice,
            open
        }

        try {
            const portfolio = await Portfolio.findOne({
                user: req.user.id
            });

            //unable to purchase if cash is lower than stock price
            if (portfolio.cash < (newStock.salePrice * newStock.shares)) {
                return res.status(200).send('Not enough cash');
            }
            portfolio.cash -= (newStock.salePrice * newStock.shares);
            //save stock
            portfolio.stock.unshift(newStock);
            //save as transaction
            portfolio.transaction.unshift(newStock);
            await portfolio.save();

            res.json(portfolio);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

        return res.status(200).json({
            //set price for salePrice input
            price: Number(obj.latestPrice.toFixed(2))
        });

        // response.json(JSON.parse(body));
    });

});


//@route    GET api/portfolio/transaction
//@desc     Get current user transactions
//@access   Private
router.get('/transaction', auth, async (req, res) => {
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


// //@route    GET api/portfolio/iexStocks/:ticker
// //@desc     get stocks from iex api
// //@access   Public
// router.get('/iexStocks', async (req, res) => {
//     try {

//         const portfolio = await Portfolio.findOne({
//             user: req.user.id
//         });

//         let stocks = [];

//         //needs to replace ticker symbol ${ticker} string

//         //pull stock info from api
//         let buyStock = {
//             uri: `https://cloud.iexapis.com/stable/stock/GE/quote?token=pk_8681342999224df5bd6d757c1bd69566`,
//             method: 'GET'
//         };

//         request(buyStock, (error, response, body) => {
//             if (error) console.error(error);

//             if (response.statusCode !== 200) {
//                 return response.status(404).json({
//                     msg: 'No stock found for such ticker'
//                 });
//             }

//             const obj = JSON.parse(body);
//             // price = Number((Object.values(obj)[10]));
//             // console.log(price);
//             return res.status(200).json({
//                 //set price for salePrice input
//                 price: obj.latestPrice
//             });

//             // response.json(JSON.parse(body));
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });





module.exports = router;