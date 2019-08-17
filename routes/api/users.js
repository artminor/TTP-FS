const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');

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

    res.send('User route');

});



module.exports = router;