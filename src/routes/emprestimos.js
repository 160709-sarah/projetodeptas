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

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const emprestimo = emprestimos.find(e => e.id === id);

    if (!emprestimo) {
        return res.status(404).json({ error: 'Empréstimo não encontrado' });
}

    if (emprestimo.dataDevolucao !== null) {
        return res.status(400).json({ error: 'Empréstimo já foi devolvido' });
    }

    emprestimo.dataDevolucao = new Date().toISOString().split('T')[0];

    res.json({ mensagem: 'Devolução registrada com sucesso', emprestimo });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = emprestimos.findIndex(e => e.id === id);


    if (index === -1) {
        return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }

    const emprestimoRemovido = emprestimos.splice(index, 1);
    res.json({ mensagem: 'Empréstimo removido com sucesso', emprestimo: emprestimoRemovido[0] });
});
module.exports = router;