const criaEscreveCSV = require('csv-writer').createObjectCsvWriter;

// A constante determina o caminho do CSV e suas colunas
const escreveCSV = criaEscreveCSV({
    path: 'primeiroCSV.csv', // Nome do arquivo de saída do CSV
    header: [
        {id: 'nome', title: 'Nome'},
        {id: 'idade', title: 'Idade'},
        {id: 'email', title: 'Email'}
    ],
    // fieldDelimiter: ';' // Ajuda o excel a interpretar cada atributo como sendo uma coluna (já que o excel em algumas regiões interpreta por padrão a vírgula)
});

// Constante com os dados que serão inseridos no arquivo CSV
const informacoes = [
    {nome: 'Julia', idade: 26, email: 'julia@exemplo.com'},
    {nome: 'Claudinei', idade: 58, email: 'claudinei@exemplo.com'},
    {nome: 'Jerônimo', idade: 47, email: 'jeronimo@exemplo.com'}
];

// writeRecords é o método que grava os dados da const registros em csvWriter
escreveCSV.writeRecords(informacoes)
    .then(() => {
        console.log('Dados escritos com sucesso no arquivo CSV!');
    })
    // catch funciona como tratamento de erro, caso o código não funcione como esperado
    .catch((err) => {
        console.log('Erro ao escrever no arquivo CSV:', err);
    });
