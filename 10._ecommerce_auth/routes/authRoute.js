const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.resgister);
router.post('/login', authController.login);
router.get('/me', authMiddleware.isLogin, authController.getMe);
router.delete('/logout', authMiddleware.isLogin, authController.logout);

module.exports = router;