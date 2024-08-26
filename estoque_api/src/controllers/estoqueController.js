const Produto = require('../models/produto');

// Função para cadastrar um novo produto
async function cadastrarProduto(req, res) {
    try {
        const { nome, quantidade } = req.body;  // Dados enviados via formulário
        const produto = await Produto.create({ nome, quantidade });
        res.status(201).send(`Produto cadastrado: ${produto.nome} com quantidade ${produto.quantidade}`);
    } catch (error) {
        res.status(500).send('Erro ao cadastrar produto');
    }
}

// Função para obter um produto pelo ID
async function obterProduto(req, res) {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (produto) {
            res.status(200).send(`Produto: ${produto.nome}, Quantidade: ${produto.quantidade}`);
        } else {
            res.status(404).send('Produto não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao obter produto');
    }
}

// Função para listar todos os produtos
async function listarProdutos(req, res) {
    try {
        const produtos = await Produto.findAll();
        let responseText = 'Produtos no estoque:\n';
        produtos.forEach(produto => {
            responseText += `ID: ${produto.id}, Nome: ${produto.nome}, Quantidade: ${produto.quantidade}\n`;
        });
        res.status(200).send(responseText);
    } catch (error) {
        res.status(500).send('Erro ao listar produtos');
    }
}

// Função para atualizar um produto
async function atualizarProduto(req, res) {
    try {
        const { id, quantidade } = req.body;
        const produto = await Produto.findByPk(id);
        if (produto) {
            produto.quantidade = quantidade;
            await produto.save();
            res.status(200).send(`Produto atualizado: ${produto.nome}, Nova quantidade: ${produto.quantidade}`);
        } else {
            res.status(404).send('Produto não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao atualizar produto');
    }
}

// Função para excluir um produto
async function excluirProduto(req, res) {
    try {
        const { id } = req.body;
        const produto = await Produto.findByPk(id);
        if (produto) {
            await produto.destroy();
            res.status(200).send(`Produto excluído: ${produto.nome}`);
        } else {
            res.status(404).send('Produto não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro ao excluir produto');
    }
}

module.exports = {
    cadastrarProduto,
    obterProduto,
    listarProdutos,
    atualizarProduto,
    excluirProduto
};
