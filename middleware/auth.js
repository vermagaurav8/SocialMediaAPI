const jwt = require('jsonwebtoken');

exports.isAuthorized = (req, res, next) => {
    // JWT Token passed as authorization header
    try{
        const token = req.header("Authorization").split(' ')[1];

        if(!token) {
            return res.status(401).json({ message: "Invalid Token Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decodedToken.userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: console.log(error) });
    }


}