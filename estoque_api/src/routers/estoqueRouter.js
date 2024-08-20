const express = require('express')
const router = express.Router()

const estoqueController = require('../controller/estoqueController')

router.get('/api/produtos', estoqueController.getProdutos)
router.post('/api/produtos/cadastrar', estoqueController.postCadastrarProduto)

module.exports = router