// const { resgister } = require("../controllers/authController");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const user = require("../models/userModel");
const jwtConfig = require('../configs/jwt');
const mailServer = require('./mailServices');


const resgister = async (body) => {
    // console.log(body);

    if (!body.name || !body.email || !body.password) {
        throw new Error('Name, Email, Password require.');
    };

    let checkEmail = await user.findByEmail(body.email);
    if (checkEmail.length > 0) {
        throw new Error('Duplicate Email.');
    }

    const hashPassword = await bcrypt.hash(body.password, 10);
    // console.log(hashPassword);

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpired = new Date(Date.now() + 2 * 60 * 1000); // 1 hour
    console.log(verificationToken);

    const result = await user.create({
        name: body.name,
        email: body.email,
        password: hashPassword,
        verificationToken,
        verificationExpired
    });

    await mailServer.sendVerificationEmail(body.email, verificationToken);

    const row = await user.getByID(result);
    return row;

    // return body;
}

const login = async (body) => {
    if (!body.email || !body.password) {
        throw new Error('Email and Password is required.');
    };

    let userInfo = await user.findByEmail(body.email);
    if (userInfo.length == 0) {
        throw new Error('Invalid Email and Password.');
    }

    let isMatch = await bcrypt.compare(body.password, userInfo[0].password);
    // console.log(isMatch);
    if (!isMatch) {
        throw new Error('Invalid Email and Password.');
    }

    const token = jwt.sign(
        { id: userInfo[0].id, email: userInfo[0].email },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expireIn }
    );

    // console.log(userInfo); return;
    if (!userInfo[0].is_verified) {
        throw new Error('Email is not verify.');
    }


    await user.addToken(token, userInfo[0].id);
    const row = await user.getByID(userInfo[0].id);

    return row;

    // console.log(token);
    // return { // ត្រូវបានជំនួសដោយ return row;
    //     id: userInfo[0].id,
    //     name: userInfo[0].name,
    //     email: userInfo[0].email,
    //     phone: userInfo[0].phone,
    //     address: userInfo[0].address,
    //     token: token
    // }
}

const getMe = async (id) => {
    let row = await user.getByID(id);

    return row;
}

const logout = async (id) => {
    await user.removeToken(id);
}

const verifyEmail = async (token) => {
    if (!token) {
        throw new Error('Verification Token is required.');
    }

    const userInfo = await user.findByVerificationEmail(token);
    console.log(userInfo);

    if (userInfo.length == 0) {
        throw new Error('Invalid Verification Token.')
    }

    if (userInfo[0].is_verified) {
        throw new Error('Email Already Verify.');
    }

    if (!userInfo[0].verification_expires || new Date(userInfo[0].verification_expires) < new Date()) {
        throw new Error('Verification token has expired.');
    }

    await user.verifiEmail(userInfo[0].id);

    return { 'message': 'Eamil Verify Successfully.' }
}

const resendVerificationEmail = async (email) => {
    if (!email) {
        throw new Error('Email is required.');
    }

    const userInfo = await user.findByEmail(email);
    if (userInfo.length == 0) {
        throw new Error('User not found.');
    }

    if (userInfo[0].is_verified) {
        throw new Error('Email already Verifired.');
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpired = new Date(Date.now() + 2 * 60 * 1000); // 1 

    await user.resendVerificationEmail({
        verificationToken,
        verificationExpired,
        id: userInfo[0].id
    })

    await mailServer.sendVerificationEmail(email, verificationToken);

    return { 'message': 'Resend Email Successfully.' };

}

module.exports = { resgister, login, getMe, logout, verifyEmail, resendVerificationEmail }