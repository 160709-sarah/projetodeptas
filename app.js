


const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const livrosRoutes = require('./routes/livros');
app.use('/livros', livrosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});