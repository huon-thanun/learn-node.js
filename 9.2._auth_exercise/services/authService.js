const authModel = require('../models/authModel');

const register = async (body) => {
    console.log(body);

    if (!body.name || !body.email || !body.password){
        throw new Error('Name, Email or Password require.');
    };

    const existingUser = await authModel.findByEmail(body.email);
    if (existingUser) {
        throw new Error("Email already exists");
    }

    let result = await authModel.register(body);
    let row = await authModel.getSingleUser(result);

    return row;
}

const getAll = async () => {
    const rows = await authModel.getAll();
    
    return rows;
}

const getSingleUser = async (id) => {
    const row = await authModel.getSingleUser(id);

    if (row.length == 0){
        throw new  Error('User Not Found.')
    }

    return row;
}

const login = async (body) => {

    if(!body.email || !body.password){
        throw new Error("Email and Password are required");
    }
    const user = await authModel.findByEmail(body.email);
    // console.log("User : ",user);
    if (!user) {
        throw new Error("Invalid credentials");
    }
    // compare password (plain text for now)
    if (user.password !== body.password) {
        throw new Error("Invalid Password");
    }

    return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

module.exports = {register, getAll, getSingleUser, login}