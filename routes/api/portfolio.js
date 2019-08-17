const express = require('express');
const router = express.Router();

//@route    GET api/portfolio
//@desc     Test route
//@access   Public
router.get('/', (req, res) => res.send('portfolio route testing'));

module.exports = router;