const jwt = require("jsonwebtoken");
const { secret } = require("../config/general.config");

const authenticateJWT = (req, res, next) => {
    console.log("entrou middware")
    const authHeader = req.headers.authorization;

    console.log(authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;
