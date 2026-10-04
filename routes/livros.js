const express = require('express');
const router = express.Router();

let livros = [
    { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis' },
    { id: 2, titulo: 'O Hobbit', autor: 'J.R.R. Tolkien' }
];

router.get('/', (req, res) => {
    res.json(livros);
});

module.exports = router;

router.post('/', (req, res) => {
    const novoLivro = {
        id: livros.length + 1,
        titulo: req.body.titulo,
        autor: req.body.autor
    };
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
    });

    