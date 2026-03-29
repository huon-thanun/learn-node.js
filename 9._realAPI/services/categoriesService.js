const categoriesModel = require('../models/categoriesModel')

const getAllC = async function name() {

    // return await categoriesModel.getAllC(); //the same result.

    const rows = await categoriesModel.getAllC();

    return rows
}

const createC = async function name(body) {
    let result = await categoriesModel.createC(body);
    let row = await categoriesModel.getSingleC(result);

    return row;
}

const updateC = async function name(body, id) {
    // let sql = 'update categories set name = ? where id = ?';
    // let data = [body.name, params.id];
    // let [result] = await pool.query(sql, data);
    // let [row] = await pool.query('select *from categories where id = ?', [id]);

    let row = await categoriesModel.getSingleC(id);
    if (row.length == 0){
        throw new Error('No Category Found.');
    }

    await categoriesModel.updateC(body, id)

    row = await categoriesModel.getSingleC(id);
    return row;
}

const deleteC = async function name(id) {
    let row = await categoriesModel.getSingleC(id);

    if (row.length == 0) {
        throw new Error('No Category Found.');
    }

    await categoriesModel.deleteC(id);
    // row = await categoriesModel.getSingleC(id)

    // return row;
}

const getSingleC = async function name(id) {
    const row = await categoriesModel.getSingleC(id);

    if (row.length == 0){
        throw new Error('No Category Found.')
    }
    
    return row;
}


module.exports = { getAllC, createC, updateC, deleteC, getSingleC };