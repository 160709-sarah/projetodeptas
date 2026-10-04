const express = require('express');
const router = express.Router();

let emprestimos = [
    {id: 1, livroId:1, exemplarId:2, dataEmprestimo: '2026-10-04', dataDevolucao: null}
];

router.get('/', (req, res) => {
    res.json(emprestimos);
});

router.post('/', (req, res) => {
    const { livroId, exemplarId } = req.body;

    if (!livroId || !exemplarId) {
        return res.status(400).json({ error: 'LivroId e ExemplarId são obrigatórios' });
    }

    const emprestimoAtivos = emprestimos.filter(e => e.leitorId === leitorId && e.dataDevolucao === null);
    if (emprestimoAtivos.length >= 3) {
        return res.status(400).json({ error: 'O leitor já possui 3 empréstimos ativos' });
    }

    const exemplarEmprestado = emprestimos.find(e => e.exemplarId === exemplarId && e.dataDevolucao === null);
    if (exemplarEmprestado) {
        return res.status(400).json({ error: 'O exemplar já está emprestado' });
    }

    const novoEmprestimo = {
        id: emprestimos.length + 1,
        livroId,    
        exemplarId,
        dataEmprestimo: new Date().toISOString().split('T')[0],
        dataDevolucao: null
    };  

    emprestimos.push(novoEmprestimo);
    res.status(201).json(novoEmprestimo);
});
module.exports = router;