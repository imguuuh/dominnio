//
// Aviso:
//
// Alguns domínios não podem serem registrados por
// serem da propriedade de alguma empresa privada,
// como por exemplo os domínios: .bradesco; .google;
// .youtube e etc.
//
//

// Importações
const chalk = require("chalk"); // Cores no console
const clear = require('console-clear'); // Limpar o console
const tld_list = require('./tld_list.json'); // O arquivo JSON com todos os TLDs
const inquirer = require("inquirer"); // Input do usuário (perguntas)

// Função para checar se o texto é válido
function check_text(txt) {
    if (txt === null || txt === " " || txt === "" || txt === undefined) {
        return false;
    }

    var letras = /^[0-9a-zA-Z]+$/;

    if (txt.match(letras)) {
        return true;
    } else {
        return false;
    }
}

clear(); // Limpa o console

//
// Título
// 
console.log(chalk.gray("\nOlá " + process.env.USERNAME + ", bem-vindo(a) ao "));

console.log(chalk.red(' _______   ______   .___  ___.  __  .__   __. .__   __.  __    ______   '));
console.log(chalk.red('|       \\ /  __  \\  |   \\/   | |  | |  \\ |  | |  \\ |  | |  |  /  __  \\  '));
console.log(chalk.red('|  .--.  |  |  |  | |  \\  /  | |  | |   \\|  | |   \\|  | |  | |  |  |  | '));
console.log(chalk.red("|  |  |  |  |  |  | |  |\\/|  | |  | |  . `  | |  . `  | |  | |  |  |  | "));
console.log(chalk.red("|  '--'  |  `--'  | |  |  |  | |  | |  |\\   | |  |\\   | |  | |  `--'  | "));
console.log(chalk.red('|_______/ \\______/  |__|  |__| |__| |__| \\__| |__| \\__| |__|  \\______/ '));

console.log("")

//
// Código
// 

var lista_contem = []; // Inicialização da lista que irá conter os TLDs disponívels (se houver).

// Pergunta o nome do site.
inquirer.prompt([
        {
            type: 'input',
            message: 'Qual é o nome do site?',
            name: 'name'
        }
    ]).then(answers => {
        var name = answers.name // Inicializa uma variável.

        clear(); // Limpa o console
        console.log("");

        if (!check_text(name)) { // Checa se o nome é inválido, se for, o programa para.
            console.log(chalk.red("Por favor, insira um nome válido."));
            process.exit(0);
        }

        if (name.length > 63) { // Checa se o nome tem mais de 63 caracteres, se tiver, o programa para.
            console.log(chalk.red("Um domínio não pode ter mais do que 63 caracteres!"));
            process.exit(0);
        }

        // Adiciona na "lista_contem" os TLD's que terminam no nome que o usuário inseriu.
        for (var i in tld_list) {
            var domain = tld_list[i];
            if (name.endsWith(domain)) {
                lista_contem.push(domain);
            }
        }
    
        if (lista_contem.length <= 0) { // Se o tamanho da lista for menor ou igual a 0
            console.log(chalk.red("Infelizmente não há nenhum TLD disponível para esse nome :("));
            process.exit(0);
        } else { // Caso contrário (se for maior que zero)
            console.log(chalk.green("Yupi!!! Há " + lista_contem.length + " TLD(s) disponíveis para esse nome :)"))
            console.log("")
            console.log(chalk.yellowBright(lista_contem.join(", ")));
            console.log("")
            console.log(chalk.green("Como ficariam:"))
            console.log("")
            for (var i in lista_contem) {
                var tld = lista_contem[i];
                console.log(chalk.yellowBright(name.replace(tld,"") + "." + tld));
            }
            process.exit(0);
        }

    }).catch(error => {
        // Caso dê algum erro, printar no console o erro e parar o programa.
        if(error.isTtyError) {
            console.log(chalk.red(error.message));
        } else {
            console.log(chalk.red(error.message));
        }
});