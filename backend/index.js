const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5175;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'caio123',
    database: 'form1'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

app.post('/enviar', (req, res) => {
    console.log('Recebendo solicitação POST');
    const { nome, email, nasc, natural, cel, telefone, endereco, cidade, sexo } = req.body;
    console.log('Dados recebidos:', req.body);

    if (!nome || !email || !nasc || !natural || !cel || !telefone || !endereco || !cidade || !sexo) {
        res.status(400).send('Todos os campos são obrigatórios');
        return;
    }

    const query = 'INSERT INTO formulario_db (nome, email, nasc, `natural`, cel, telefone, endereco, cidade, sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [nome, email, nasc, natural, cel, telefone, endereco, cidade, sexo], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro ao inserir dados no banco de dados');
            return;
        }
        console.log('Dados inseridos com sucesso no banco de dados');
        res.status(200).send('Dados inseridos com sucesso');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
