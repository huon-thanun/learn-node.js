const authService = require('../services/authService')

const resgister = async (req, res) => {
    try {
        let result = authService.resgister(req.body);

        return res.json({
            result: true,
            msg: 'Regoster Successfully.',
            data: result
        })
    }
    catch(err){
        console.log(err);
        return res.json({
            result: false,
            msg: err.message
        })
    }

    // return result;
    
}

module.exports = { resgister, }