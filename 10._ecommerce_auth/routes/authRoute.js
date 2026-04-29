const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { registerUserSchema, loginUserSchema } = require('../validators/userValidator');

const router = express.Router();

router.post('/register',validate(registerUserSchema), authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware.isLogin, authController.getMe);
router.delete('/logout', authMiddleware.isLogin, authController.logout);
router.get('/verify-email', authController.verifyEmail);
router.put('/resend-verify-email', authController.resendVerificationEmail);

module.exports = router;