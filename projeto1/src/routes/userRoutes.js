const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para exibir o perfil do usuário
router.get('/profile/:userId', userController.getUserProfile);

// Rota para atualizar o perfil do usuário
router.post('/profile/:userId', userController.updateUserProfile);

module.exports = router;
