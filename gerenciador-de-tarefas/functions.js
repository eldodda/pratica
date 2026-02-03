import fs from 'fs';

const dateForm = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
});

export function exibirTarefas(input, backToMenu) {
    input.question("=======O que deseja fazer?=======\n[1] Exibir todas as tarefas\n[2] Exibir tarefas a fazer\n[3] Exibir tarefas em andamento\n[4] Exibir tarefas concluídas\n[5] Voltar ao menu principal\n>", (resposta) => {
        fs.readFile('tasks.json', 'utf-8', (erro, dado) => {
            let json = [];

            if (!erro && dado) json = JSON.parse(dado);

            switch (Number(resposta)) {
                case 1:
                    if (json.length === 0) {
                        console.log("Nenhuma tarefa encontrada.")
                    } else {
                        console.log(json);
                    }
                    break;
                case 2:
                    let toDo = [];
                    toDo = json.filter(tarefa => tarefa.status === "A fazer");
                    if (toDo.length === 0) {
                        console.log("Nenhuma tarefa neste estado.")
                    } else {
                        console.log(toDo);
                    }
                    break;
                case 3:
                    let onGoing = [];
                    onGoing = json.filter(tarefa => tarefa.status === "Em andamento");
                    if (onGoing.length === 0) {
                        console.log("Nenhuma tarefa neste estado.")
                    } else {
                        console.log(onGoing);
                    }
                    break;
                case 4:
                    let finished = [];
                    finished = json.filter(tarefa => tarefa.status === "Concluída");
                    if (finished.length === 0) {
                        console.log("Nenhuma tarefa neste estado.")
                    } else {
                        console.log(finished);
                    }
                    break;
                case 5:
                    break;
            }
            backToMenu();
        });

    });
};


export function novaTarefa(input, backToMenu) {
    input.question("Insira a descrição da nova tarefa:\n>", (descricao) => {
        fs.readFile('tasks.json', 'utf-8', (erro, dado) => {
            let json = [];
            if (!erro && dado) {
                json = JSON.parse(dado);
            }
            let novoId = 1;
            if (json.length > 0) {
                const ultimaTarefa = json[json.length - 1];
                novoId = ultimaTarefa.id + 1;
            }
            const date = new Date()
            const newTask = {
                id: novoId,
                descricao: descricao,
                status: 'A fazer',
                createdAt: dateForm.format(date),
                updatedAt: dateForm.format(date)
            }

            json.push(newTask);

            fs.writeFile('tasks.json', JSON.stringify(json, null, 3), (erro) => {
                if (erro) {
                    console.log('Erro ao salvar: ', erro);
                } else {
                    console.log('Tarefa salva com sucesso!');
                }
                backToMenu();
            });
        });
    });
}


export function atualizarTarefa(input, backToMenu) {
    input.question("Insira o ID da tarefa a ser alterada:\n>", (idMod) => {
        fs.readFile('tasks.json', 'utf-8', (erro, dado) => {
            let json;
            if (!erro && dado) {
                json = JSON.parse(dado);
            }

            let taskMod = json.find(t => t.id === Number(idMod));
            if (!taskMod) {
                console.log("Tarefa não encontrada!");
                return backToMenu();
            }
            menuStatus(input, backToMenu);

            function menuStatus() {
                input.question("Qual o status atual da tarefa?\n[1] A fazer.\n[2] Em andamento\n[3] Concluída\n[4] Cancelar\n>", (stats) => {
                    let novoStatus = "";

                    switch (stats) {
                        case '1': novoStatus = 'A fazer'; break;
                        case '2': novoStatus = 'Em andamento'; break;
                        case '3': novoStatus = 'Concluída'; break;
                        case '4': return backToMenu();
                        default:
                            console.log("Opção inválida. Tente novamente.");
                            return menuStatus();
                    }

                    if (novoStatus === taskMod.status) {
                        console.log('Este já é o estado atual.');
                        return menuStatus();
                    }
                    taskMod.status = novoStatus;
                    taskMod.updatedAt = dateForm.format(new Date());

                    fs.writeFile('tasks.json', JSON.stringify(json, null, 3), (erro) => {
                        if (erro) {
                            console.log("Erro ao atualizar. Tente novamente");
                            menuStatus();
                        } else {
                            console.log("Tarefa atualizada com sucesso!");
                            backToMenu();
                        }
                    })

                })
            }


        }
        );
    });
    backToMenu();
}

export function apagarTarefa(input, backToMenu) {
    input.question("Qual tarefa você deseja excluir?\n>", (idDel) => {
        fs.readFile('tasks.json', 'utf-8', (erro, dado) => {
            let json;
            if (!erro && dado) {
                json = JSON.parse(dado);
            }

            let taskDel = json.find(t => t.id === Number(idDel));

            if (!taskDel) {
                console.log("Tarefa não encontrada!");
                return backToMenu();
            }

            const updatedList = json.filter(tarefa => tarefa.id !== taskDel.id);
            fs.writeFile('tasks.json', JSON.stringify(updatedList, null, 3), (erro) => {
                if (erro) {
                    console.log("Erro ao deletar. Tente novamente.");
                    backToMenu();
                } else {
                    console.log(`Tarefa "${taskDel.descricao}" deletada com sucesso!`);
                    backToMenu();
                }
            });
        });
    });
}