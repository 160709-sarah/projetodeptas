const express = require('express');
const router = express.Router();

let livros = [
    { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis' },
    { id: 2, titulo: 'O Hobbit', autor: 'J.R.R. Tolkien' }
];

router.get('/', (req, res) => {
    res.json(livros);
});



router.post('/', (req, res) => {
    const novoLivro = {
        id: livros.length + 1,
        titulo: req.body.titulo,
        autor: req.body.autor
    };
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
    });

    router.put('/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const livro = livros.find(l => l.id === id);

        if(!livro) {
            return res.status(404).json({ erro: 'livro não encontrado' });
        }

        livro.titulo = req.body.titulo || livro.titulo;
        livro.autor = req.body.autor || livro.autor;

        res.json(livro);
    });

    router.delete('/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const index = livros.findIndex(l => l.id === id);

        if(index === -1) {
            return res.status(404).json({ erro: 'livro não encontrado'});
        }

        const livroRemovido = livros.splice(index, 1);
        res.json({ mensagem: 'livro removido com sucesso', livro: livroRemovido[0] });
    });

    module.exports = router;