const express = require('express');
const router = express.Router();

let leitores = [
    { id: 1, nome: 'Danilo Silva', email: 'joao@email.com'},
    { id: 2, nome: 'Eduarda Souza', email: 'maria@email.com'}
];

router.get('/', (req, res) => {
    res.json(leitores);
});

router.post('/', (req, res) => {
    const { nome, email } = req.body;
    
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }

    const novoLeitor = {
        id: leitores.length + 1,
        nome,
        email
    };

    leitores.push(novoLeitor);
    res.status(201).json(novoLeitor);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email } = req.body;

    const leitor = leitores.find(l => l.id === id);

    if (!leitor) {
        return res.status(404).json({ error: 'Leitor não encontrado' });
    }

    if (nome) leitor.nome = nome;
    if (email) leitor.email = email;

    res.json(leitor);
});



module.exports = router;