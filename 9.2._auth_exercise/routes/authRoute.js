const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.get('/users', authController.getAll);
router.get('/user/:id', authController.getSingleUser);
router.post('/login', authController.login);

module.exports = router;