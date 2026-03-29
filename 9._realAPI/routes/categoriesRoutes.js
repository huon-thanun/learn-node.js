const express = require('express');
const pool = require('../config/db')

const categoriesController = require('../controllers/categoriesController')

const router = express.Router();

router.get('/categories', categoriesController.getAllC);

router.post('/category', categoriesController.createC);

router.put('/category/:id', categoriesController.updateC);

router.delete('/category/:id', categoriesController.deleteC);

router.get('/category/:id', categoriesController.getSingleC);

module.exports = router;