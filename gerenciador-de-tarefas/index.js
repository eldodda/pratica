import { exibirTarefas, novaTarefa, atualizarTarefa, apagarTarefa } from './functions.js';
import readline from 'readline';

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Bem vindo à sua lista de tarefas!\n=================================");
menu();


function menu() {
    input.question('=======O que deseja fazer?=======\n[1] VER LISTA DE TAREFAS\n[2] NOVA TAREFA\n[3] ATUALIZAR TAREFAS\n[4] DELETAR TAREFA\n[5] SAIR\n>', (opcao) => {
        switch (Number(opcao)) {
            case 1:
                exibirTarefas(input, menu);
                break;
            case 2:
                novaTarefa(input, menu);
                break;

            case 3:
                atualizarTarefa(input, menu);
                break;

            case 4:
                apagarTarefa(input, menu);
                break;

            case 5:
                input.close();
                break;

            default:
                console.log('Entrada inválida.');
                menu();
                break;
        }
    })
};
