const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

//@route    POST api/users
//@desc     Register user
//@access   Public
router.post('/', [
    //check name cannot be empty
    check('name', 'Name is required').not().isEmpty(),
    //check username must be email
    check('email', 'Please include a valid email').isEmail(),
    //check password must be 8 or more characters
    check('password', 'Please enter a password with 8 or more characters').isLength({
        min: 8
    })
], async (req, res) => {
    const errors = validationResult(req);
    //if there are errors return 400 bad request
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    //pull variables out of req.body
    const {
        name,
        email,
        password
    } = req.body;

    try {
        //see if user exists
        //look for user by email
        let user = await User.findOne({
            email
        });

        //if user exist, send back 400 bad request error
        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: 'User already exists'
                }]
            });
        }

        //create new instance of user with fields that are needed
        user = new User({
            name,
            email,
            password
        });

        //encrypt password before saving user
        //create salt for hashing password with 10 rounds (suggested by documentation, but more rounds = more secure, but slower)
        const salt = await bcrypt.genSalt(10);
        //put in password
        user.password = await bcrypt.hash(password, salt);
        //save to database
        await user.save();

        //return jsonwebtoken
        //get payload
        const payload = {
            user: {
                id: user.id
            }
        }

        //sign token, pass in payload and secret
        jwt.sign(payload, config.get('jwtSecret'), {
            //token expires in an hour
            expiresIn: 3600
            //either get error or token as result
        }, (err, token) => {
            if (err) throw err;
            //if no error send token back to client
            res.json({
                token
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});



module.exports = router;