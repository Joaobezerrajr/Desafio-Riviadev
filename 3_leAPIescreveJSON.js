const consomeApi = require('axios');
const arqFs = require('fs');

const chaveApi = '663d353ed86a42e82bd685f9d7451220';
const city = 'João Pessoa';
const urlApi = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${chaveApi}&units=metric`;

consomeApi.get(urlApi)
    .then((response) => {
        const dadosClima = response.data;

        // Dados que serão extraídos da API para serem escritos em um JSON
        const extrairDadosApi = {
            cidade: dadosClima.name,
            temperatura: dadosClima.main.temp,
            umidade: dadosClima.main.humidity,
            condicao: dadosClima.weather[0].description
        };
        
        // Os dados extraídos da API serão escritos no JSON
        arqFs.writeFile('clima_joaoPessoa.json', JSON.stringify(extrairDadosApi, null, 2), (err) => {
            if (err) {
                console.log('Erro ao escrever o arquivo JSON:', err)
            } else {
                console.log('Dados do clima da cidade de João Pessoa foram escritos no JSON com sucesso!')
            }
           });
    })
    // catch funciona como tratamento de erro, caso o código não funcione como esperado
    .catch((error) => {
        console.log('Erro ao fazer a requisição à API:', error);
    });
