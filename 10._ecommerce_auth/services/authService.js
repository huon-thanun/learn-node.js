// const { resgister } = require("../controllers/authController");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const user = require("../models/userModel");
const jwtConfig = require('../configs/jwt');
const { get } = require('../routes/authRoute');


const resgister = async (body) => {
    // console.log(body);

    if (!body.name || !body.email || !body.password) {
        throw new Error('Name, Email, Password require.');
    };

    let checkEmail = await user.findByEmail(body.email);
    if (checkEmail.length > 0) {
        throw new Error('Email Duplicate');
    }

    let hashPassword = await bcrypt.hash(body.password, 10);
    console.log(hashPassword);

    let result = await user.create({
        name: body.name,
        email: body.email,
        password: hashPassword
    });

    let row = await user.getByID(result);
    return row;

    // return body;
}

const login = async (body) => {
    if (!body.email || !body.password) {
        throw new Error('Email and Password is required.');
    };

    let userSecure = await user.findByEmail(body.email);
    if (userSecure.length == 0) {
        throw new Error('Email and Password Invalid.');
    }

    let isMatch = await bcrypt.compare(body.password, userSecure[0].password);
    // console.log(isMatch);
    if (!isMatch) {
        throw new Error('Email and Password Invalid.');
    }

    const token = jwt.sign(
        { id: userSecure[0].id, email: userSecure[0].email },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expireIn }
    )

    // console.log(token);
    return {
        id: userSecure[0].id,
        name: userSecure[0].name,
        email: userSecure[0].email,
        phone: userSecure[0].phone,
        address: userSecure[0].address,
        token: token
    }
}

const getMe = async (id) => {
    let row = await user.getByID(id);

    return row;
}

module.exports = { resgister, login, getMe }