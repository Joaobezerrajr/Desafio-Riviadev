const {Client} = require('pg')

// inserção dos dados de conexão do banco de dados
const cliente = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
});

// faz a conexão com o banco de dados
cliente.connect();

const inserirUsuario = async (nome, email) => {
    try {
        const query = 'INSERT INTO usuarios (nome, email) VALUES ($1, $2)';
        const values = [nome, email];
        
        await cliente.query(query, values);
        console.log('Usuário incluido com sucesso!');
    } catch (err) {
        console.error('Erro ao incluir usuário na tabela:', err);
    } finally {
        cliente.end()
    }
    // o código acima faz a conexão assíncrona com o banco de dados, onde ele inicia fazendo a inclusão dos dados do usuário conforme a constante 'inserirUsuario' e logo após mostra uma mensagem de sucesso. Se houver algum erro, irá mostrar mensagem de excessão.
    // por fim, fecha a conexão com o banco de dados.
};

inserirUsuario('Bianca Pacheco', 'bianca.pacheco@exemplo.com');
