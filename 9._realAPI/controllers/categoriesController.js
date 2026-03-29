// const pool = require('../config/db');
const categoriesService = require('../services/categoriesService')

const getAllC = async (req, res) => {
    try {
        const rows = await categoriesService.getAllC()
        // console.log(rows);

        return res.json({
            result: true,
            msg: 'Get All Categories Successfully',
            date: rows
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error',
            // date: rows
        })
    }
};

const createC = async (req, res) => {
    // console.log(req.body);

    try {
        let row = await categoriesService.createC(req.body)
        // console.log(result);
        // console.log(row);

        return res.json({
            result: true,
            msg: 'Create Category Successfully',
            data: row[0]
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error',
            // data: rows
        })
    }
};

const updateC = async (req, res) => {
    try {
        // console.log(req.params.id);
        // console.log(req.body);
        let row = await categoriesService.updateC(req.body, req.params.id)
        // if (row.length == 0) {
        //     return res.status(404).json({
        //         result: false,
        //         msg: 'Category Not Found'
        //     })
        // }

        return res.json({
            result: true,
            msg: 'Upate Category Successfully',
            data: row[0]
        })
    } catch (err) {
        console.log(err);
        if (err.message === 'No Category Found.'){
            return res.status(404).json({
                result: false,
                msg: err.message
            });
        }
        res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }
};

const deleteC = async (req, res) => {
    try {
        let row = await categoriesService.deleteC(req.params.id);
        // if (row.length == 0) {
        //     return res.status(404).json({
        //         return: false,
        //         msg: 'Category Not Found'
        //     })
        // }

        return res.json({
            result: true,
            msg: 'Delete Category Successfully'
        })
    } catch (err) {
        console.log(err);

        if (err.message === 'No Category Found.'){
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
};

const getSingleC = async (req, res) => {
    try {
        const row = await categoriesService.getSingleC(req.params.id);
        // console.log(row);

        // if (row.length == 0) {
        //     return res.status(404).json({
        //         result: false,
        //         msg: 'Category Not Found'
        //     })
        // }

        return res.json({
            result: true,
            msg: 'Get A Category Successfully',
            data: row[0]
        })
    } catch (err) {
        console.log(err);

        if (err.message === 'No Category Found.'){
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

};

module.exports = {
    getAllC, createC, updateC, deleteC, getSingleC
}