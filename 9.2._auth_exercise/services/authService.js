const authModel = require('../models/authModel');

const register = async (body) => {
    console.log(body);

    if (!body.name || !body.email || !body.password){
        throw new Error('Name, Email or Password require.');
    };

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

module.exports = {register, getAll, getSingleUser}