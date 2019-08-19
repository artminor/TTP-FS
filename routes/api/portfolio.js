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
const iexAPI = 'https://cloud.iexapis.com/stable';

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





module.exports = router;