const authService = require('../services/authService');

// const hideUserPassword = (user) => {
//     if (!user) return user;
//     const { password, ...hidePassword } = user;

//     return hidePassword;
// }

const register = async (req, res) => {
    try {
        const row = await authService.register(req.body);

        return res.json({
            result: true,
            msg: 'Register Successfully.',
            // data: hideUserPassword(row[0]),
            data: row[0]
        })
    } catch (err) {
        console.log(err);
        return res.json({
            result: false,
            msg: err.message
        })
    }
}

const getAll = async (req, res) => {
    try {
        const rows = await authService.getAll();
        // const safeRows = rows.map((row) => hideUserPassword(row));

        return res.json({
            result: true,
            msg: 'Get All Users Successfully',
            data: rows
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error',
            // data: rows
        })
    }
}

const getSingleUser = async (req, res) => {
    try {
        const row = await authService.getSingleUser(req.params.id);
        console.log(row);


        return res.json({
            result: true,
            msg: 'Get A User Successfully.',
            // data: hideUserPassword(row[0]),
            data: row[0]
        })

    } catch (err) {
        console.log(err);

        if (err.message === 'User Not Found.') {
            return res.status(404).json({
                result: false,
                msg: err.message
            });
        }

        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }
}

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        // console.log("resul in conttroller : ", result);

        res.json({
            result : true, 
            message : "Login Successfully",
            data : result
        })
    } catch (error) {
        res.json({
            result : false,
            message: error.message,
        });
    }
}

module.exports = { register, getAll, getSingleUser, login }