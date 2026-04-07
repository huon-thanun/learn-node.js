const jwt = require('jsonwebtoken');
const user = require('../models/userModel');
const jwtConfig = require('../configs/jwt');

const isLogin = async (req, res, next) => {
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

        let userInfo = await user.getByToken(token);
        console.log(userInfo);
        
        if (userInfo.length == 0){
            throw new Error('Invalid or Expired Token.');
        }

        // req.user = decode; //user or me just a variable
        req.me = decode;

        next();
        
    } catch (err) {
        console.log(err);
        
        return res.json({
            result: false,
            msg: err.message
        })
    }
}

module.exports = { isLogin }