require('./config/dotenv');

const express = require('express');
const { initDatabase } = require('./config/db');
const cors = require('cors');

const authRoute = require('./routes/authRoute');
const informacoesRoute = require('./routes/informacoesRoute');
const experienciasRoute = require('./routes/experienciasRoute');
const portfolioRoute = require('./routes/portfolioRoute');

const app = express();

const port = process.env.APP_PORT || 5000;

app.get('/', (req, res) => {
    res.send('Seja bem-vindo à API do Meu Site Pessoal!');
});

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/informacoes', informacoesRoute);
app.use('/api/experiencias', experienciasRoute);
app.use('/api/portfolio', portfolioRoute);

initDatabase();

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
