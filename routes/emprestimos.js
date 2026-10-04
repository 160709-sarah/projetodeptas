const express = require('express');
const router = express.Router();

let emprestimos = [
    {id: 1, livroId:1, exemplarId:2, dataEmprestimo: '2026-10-04', dataDevolucao: null}
];

router.get('/', (req, res) => {
    res.json(emprestimos);
});

module.exports = router;