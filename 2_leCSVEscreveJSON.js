const arquivoCSV = require('csv-parser') // Constante para importação da lib csv-parser
const arqFs = require('fs') //Constante para importação da lib fs do node.js
const resultado = []; // A array vazia irá armazenar os dados lidos no arquivo CSV


// Inicialização do fluxo de leitura do csv utilizando o createReadStream para o arquivo previamente selecionado. Onde o arquivo será lido em partes e armazenado na array da constante 'resultado'.
arqFs.createReadStream('primeiroCSV.csv')
    .pipe(arquivoCSV()) 
    .on('data', (data) => resultado.push(data)) 
    .on('end', () => {
        // com o .writeFile os arquivos tratados e armazenados anteriormente, são inseridos no arquivo JSON a partir da função JSON.stringify.
       arqFs.writeFile('resultadoCSV.json', JSON.stringify(resultado, null, 2), (err) => {
        if (err) {
            console.log('Erro ao escrever o arquivo JSON:', err)
        } else {
            console.log('Arquivo JSON criado com sucesso!')
        }
       })
    });