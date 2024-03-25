const jwt = require('jsonwebtoken');

const validateUser = async (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        res.send({ message: 'Please Login to continue',success:false});
    } else {
        try {
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    res.send({ message: 'Authentication Failed', success: false });
                } else {
                    req.body.userId = decoded.id;
                    next();
                }
            });
        } catch (error) {
            res.send({ error: 'Please Authenticate using valid token' });
        }
    }
};

module.exports = validateUser;
