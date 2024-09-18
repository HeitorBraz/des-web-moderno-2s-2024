const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rotas de autenticação
router.get('/login', authController.getLoginPage);
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/dashboard', authController.getDashboard);
router.get('/logout', authController.logout);

module.exports = router;
