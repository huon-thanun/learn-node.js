const { get } = require('../routes/authRoute');
const authService = require('../services/authService');

const resgister = async (req, res) => {
    try {
        let result = await authService.resgister(req.body);

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
    
};

const login = async (req, res) => {
    try{
        const result = await authService.login(req.body);
        // const row = await authModel.getByID(req.params.id)

        return res.json({
            result: true,
            msg: 'Login Successfully.',
            data: result
        })
        
    }catch(err){
        return res.json({
            result: false,
            msg: err.message
        })
    }
};

const getMe = async (req, res) => {
     try {
        // console.log(req.me);
        
        const [result] = await authService.getMe(req.me.id);

        return res.json({
            result : true,
            msg : 'Get Profile Successfully',
            data : result
        })
    } catch (err) {
        console.log(err);
        return res.json({
            result : false,
            msg : err.message
        })
    }
}

const logout = async (req, res) => {
    
    try{
        console.log(req.me);
        await authService.logout(req.me.id)
        
        return res.json({
            result: true,
            msg: 'Logout Successfully.'
        })
    } catch(err) {
        console.log(err);
        return res.json({
            result: false,
            msg: 'Internal Server Error.'
        })
    }
}

module.exports = { resgister, login, getMe, logout}