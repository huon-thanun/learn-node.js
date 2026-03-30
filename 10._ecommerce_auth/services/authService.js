// const { resgister } = require("../controllers/authController");
const bcrypt = require('bcryptjs')
const user = require("../models/userModel");

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

module.exports = { resgister, }