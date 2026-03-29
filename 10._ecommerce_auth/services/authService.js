// const { resgister } = require("../controllers/authController");

const resgister = (body) => {
    console.log(body);
    
    if (!body.name || !body.email || !body.password){
        throw new Error('Name, Email, Password require.');
    };

    return body;
}

module.exports = {resgister,}