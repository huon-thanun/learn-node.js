const pool = require('../config/db');
const productService = require('../services/productService')

const getAllP = async (req, res) => {
    try {
        const rows = await productService.getAllP()
        // console.log(rows);

        return res.json({
            result: true,
            msg: 'Get All Products Successfully',
            data: rows
        })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }

};

const createP = async (req, res) => {
    console.log(req.body);
    try {
        let [row] = await productService.createP(req.body);

        // console.log(result);

        return res.json({
            result: true,
            msg: 'Create Product Successfully',
            data: row[0]
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }

};

const updateP = async (req, res) => {
    try {
        console.log(req.params.id);

        let [row] = await productService.updateP(req.body, req.params);
        // console.log(result);
        console.log(row);

        return res.json({
            result: true,
            msg: 'Upate Product Successfully',
            data: row[0]
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }
};

const deleteP = async (req, res) => {
    try {

        let row = await productService.deleteP(req.params);
        if (row.length == 0) {
            return res.status(404).json({
                result: false,
                msg: 'Product Not Found'
            })
        }

        // console.log(req.params.id);
        // let [result] = await productService.deleteP(req.params)

        return res.json({
            result: true,
            msg: 'Delete Product Successfully'
        })

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }
};

const getSingleP = async (req, res) => {
    try {
        const row = await productService.getSingleP(req.params)
        // console.log(row);

        if (row.length == 0) {
            return res.status(404).json({
                result: false,
                msg: 'Product Not Found'
            })
        }

        return res.json({
            result: true,
            msg: 'Get A Product Successfully',
            data: row[0]
        })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }

};

module.exports = {
    getAllP, createP, updateP, deleteP, getSingleP
};