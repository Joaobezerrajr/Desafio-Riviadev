const express = require('express');
const {MongoClient} = require('mongodb');

const app = express();
const port = 3000;

app.use(express.json());


const url = 'mongodb://mongo:27017';
const dbName = 'local';

async function inserirUsuario(nome, email) {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Conexão ao MongoDB realizada com sucesso!');

        const db = client.db(dbName)
        const collection = db.collection('usuarios');

        const resultado = await collection.insertOne({nome, email, version: "1.44.3"});
        console.log('Usuário inserido:', resultado.insertedId);
        return resultado.insertedId;
    } catch (err) {
        console.error('Erro ao conectar ou inserir os dados no MongoDB:', err);
    } finally {
        await client.close();
    }
}

app.post('/usuarios', async (req, res) => {
    const {nome, email} = req.body;
    
    if(!nome || !email) {
        return res.status(400).send('Nome e email são obrigatórios');
    }

    try {
        const idUsuario = await inserirUsuario(nome, email);
        res.status(201).send({message: 'Usuário criado com sucesso!', id: idUsuario});
    } catch (err) {
        res.status(500).send('Erro ao criar o usuário');
    }
});

app.listen(port, () => {
    console.log(`A API está rodando em http://localhost:${port}`);
});