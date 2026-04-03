const jwt = require('jsonwebtoken');

const jwtConfig = require('../configs/jwt');

const isLogin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (!authHeader) {
            return res.json({
                result: false,
                msg: 'You need to login.'
            })
        };

        let parts = authHeader.split(' '); //add one more index of array when meet space
        // console.log(parts);

        if(parts.length !== 2 || parts[0] !== 'Bearer'){
            return res.json({
                result: false,
                msg: 'Invalid Token.'
            })
        }

        let token = parts[1];
        let decode = jwt.verify(token, jwtConfig.secret);
        console.log(decode);

        // req.user = decode; //user or me just a variable
        req.me = decode;

        next();
        
    } catch (err) {
        console.log(err);
        
        return res.json({
            result: false,
            msg: 'Insernal Server Error.'
        })
    }
}

module.exports = { isLogin, }