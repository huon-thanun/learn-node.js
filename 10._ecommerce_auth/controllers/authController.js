const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        let result = await authService.register(req.validData);

        return res.json({
            result: true,
            msg: 'Register Successfully.',
            data: result
        })
    }
    catch (err) {
        console.log(err);
        return res.json({
            result: false,
            msg: err.message
        })
    }

    // return result;

};

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        // const row = await authModel.getByID(req.params.id)

        return res.json({
            result: true,
            msg: 'Login Successfully.',
            data: result
        })

    } catch (err) {
        return res.json({
            result: false,
            msg: err.message
        })
    }
};

const getMe = async (req, res) => {
    try {
        // console.log(req.me);

        const row = await authService.getMe(req.user.id);

        return res.json({
            result: true,
            msg: 'Get Profile Successfully',
            data: row
        })
    } catch (err) {
        // console.log(err);
        return res.json({
            result: false,
            msg: err.message
        })
    }
}

const logout = async (req, res) => {

    try {
        console.log(req.user);
        await authService.logout(req.user.id)

        return res.json({
            result: true,
            msg: 'Logout Successfully.'
        })
    } catch (err) {
        console.log(err);
        return res.json({
            result: false,
            msg: err.message
        })
    }
};

const verifyEmail = async (req, res) => {
    try {
        // console.log('Verify Email.');
        console.log(req.query.token);

        const result = await authService.verifyEmail(req.query.token);

        return res.json({
            result: true,
            msg: result.message,
            data: []
        })

    } catch (err) {
        console.log(err);
        return res.json({
            result: false,
            msg: err.message
        })

    }
}

const resendVerificationEmail = async (req, res) => {
    try {
        const result = await authService.resendVerificationEmail(req.body.email);
        return res.json({
            result: true,
            msg: result.message,
            data: []
        })
    }catch (err) {
        console.log(err);
        return res.json({
            result: false,
            msg: err.message
        })
    }
}

module.exports = { register, login, getMe, logout, verifyEmail, resendVerificationEmail }