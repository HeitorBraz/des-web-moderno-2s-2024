const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

// Rota para cadastrar um novo produto
router.post('/api/produto/cadastrar', estoqueController.cadastrarProduto);

// Rota para obter um produto pelo ID
router.get('/api/produto/:id', estoqueController.obterProduto);

// Rota para listar todos os produtos
router.get('/api/produtos', estoqueController.listarProdutos);

// Rota para atualizar um produto
router.post('/api/produto/atualizar', estoqueController.atualizarProduto);

// Rota para excluir um produto
router.post('/api/produto/excluir', estoqueController.excluirProduto);

module.exports = router;
