const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken(req, res, next) {

        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            console.log(bearerHeader)
            const bearer = bearerHeader.split(' ');
            // Get token from array
            console.log(bearer)
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            try {
                console.log(bearerToken);

                var decoded = jwt.verify(bearerToken, 'SecrteKey');
                console.log(decoded);
                if (typeof decoded !== 'undefined') {
                    next();
                } else {
                    res.sendStatus(403);
                }
            } catch (err) {
                res.status(500).json({
                    message: err.message
                })
            }


        } else {
            // Forbidden
            res.sendStatus(403);
        }
    }
}