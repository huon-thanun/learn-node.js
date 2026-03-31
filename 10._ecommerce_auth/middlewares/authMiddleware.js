const jwt = require('jsonwebtoken');

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

        return res.json({
            result: true,
            msg: 'Get me Successfully',
        })
    } catch (err) {
        return res.json({
            result: false,
            msg: 'Insernal Server Error.'
        })
    }
}

module.exports = { isLogin, }