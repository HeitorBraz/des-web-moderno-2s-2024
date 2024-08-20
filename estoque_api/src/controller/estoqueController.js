const produto = require('../models/produto')

async function getProdutos(req, res) {
    let produtos = await produto.findAll()
    res.send(produtos)
}

function postCadastrarProduto(req, res) {
    let produto = {
        nome: req.body.nome,
        quantidade: req.body.quantidade
    }
    produto.create(produto).then(()=>{
        res.send(true)
    }).catch((err)=>{
        console.log(err)
        res.send(false)
    })
}

module.exports = {
    getProdutos,
    postCadastrarProduto
}