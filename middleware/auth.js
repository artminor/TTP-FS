const jwt = require('jsonwebtoken');
const config = require('config');

//create custom middleware
//next is callback function
module.exports = function (req, res, next) {
    //get token from header
    const token = req.header('x-auth-token');

    //check if not token
    if (!token) {
        return res.status(401).json({
            msg: 'No token, authentication denied'
        });
    }

    //verify token
    try {
        //decode token with jwt verify
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //assign decoded value to user
        req.user = decoded.user;
        next();
    } catch (err) {
        //run if token not valid
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
}