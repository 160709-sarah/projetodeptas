const express = require('express');
const router = express.Router();

let leitores = [
    { id: 1, nome: 'Danilo Silva', email: 'joao@email.com'},
    { id: 2, nome: 'Eduarda Souza', email: 'maria@email.com'}
];

router.get('/', (req, res) => {
    res.json(leitores);
});

module.exports = router;