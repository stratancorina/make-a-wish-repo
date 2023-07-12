const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyJWT = (req, res , next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    console.log(authHeader); //bearer token
    const token = authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            console.log(err);

            if (err) return res.sendStatus(403); //invalid token
            req.username = decoded.UserInfo.username;
            req.role = decoded.UserInfo.role
            console.log(decoded.UserInfo)
            next();
        }
    );
}

module.exports = verifyJWT