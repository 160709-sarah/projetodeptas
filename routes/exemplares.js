const express = require('express');
const router = express.Router();

let exemplares = [
    {id: 1, livroId: 1, status: 'disponível', localizacao: 'Estante A3'},
    { id: 2, livroId: 1, status: 'emprestado', localizacao: 'Estante A3'},
];

router.get('/', (req, res) => {
    res.json(exemplares);
});

router.post('/', (req, res) => {
    const { livroId, status, localizacao } = req.body;

    if (!livroId || !status || !localizacao) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const novoExemplar = {
        id: exemplares.length + 1,
        livroId,
        status,
        localizacao,
    };

    exemplares.push(novoExemplar);
    res.status(201).json(novoExemplar);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { livroId, status, localizacao } = req.body;

    const exemplar = exemplares.find(e => e.id === id);

    if (!exemplar) {
        return res.status(404).json({ error: 'Exemplar não encontrado' });
    }

    if (livroId) exemplar.livroId = livroId;
    if (status) exemplar.status = status;
    if (localizacao) exemplar.localizacao = localizacao;

    res.json(exemplar);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = exemplares.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Exemplar não encontrado' });
    }

    const exemplarRemovido = exemplares.splice(index, 1);
    res.json({ mensagem: 'Exemplar removido com sucesso', exemplar: exemplarRemovido[0] });
});
module.exports = router;