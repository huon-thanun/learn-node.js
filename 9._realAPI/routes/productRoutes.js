const express = require('express');

const productController = require('../controllers/productController')

const router = express.Router();

router.get('/products', productController.getAllP);

router.post('/product', productController.createP);

router.put('/product/:id', productController.updateP)

router.delete('/product/:id', productController.deleteP)

router.get('/product/:id', productController.getSingleP);



module.exports = router;