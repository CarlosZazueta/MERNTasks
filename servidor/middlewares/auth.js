const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Read token from header
    const token = req.header('x-auth-token');

    // if there is no token
    if (!token) {
        res.status(401).json({msg: 'Permission denied'});
    }

    // validate token
    try {
        const encoded = jwt.verify(token, process.env.SECRET);
        req.user = encoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Not valid Token!'});
    }
}