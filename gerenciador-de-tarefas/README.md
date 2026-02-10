# 📝 Task Manager CLI (tsk-mngr)

Um projeto prático de **CRUD** (Create, Read, Update, Delete) simples para gerenciamento de tarefas via terminal, utilizando persistência de dados em arquivo JSON.

## 🚀 Funcionalidades

- **Listar tarefas:** Exibe todas as tarefas lendo o arquivo `tasks.json`.
- **Criar tarefa:** Adiciona um novo item ao sistema.
- **Atualizar status:** Permite alternar entre:
  - `A fazer` 
  - `Em andamento` 
  - `Concluída`
- **Remover tarefa:** Exclui uma tarefa específica pelo ID.
- **Timestamp:** Registro automático de data/hora de criação e de modificação.

**URL do projeto:** https://github.com/eldodda/pratica/tree/main/gerenciador-de-tarefas


## 🛠️ Detalhes Técnicos

As tarefas são armazenadas como objetos com a seguinte estrutura:

```json
{
  "id": "1",
  "descricao": "Estudar Node.js",
  "status": "A fazer",
  "createdAt": "2024-05-20T10:00:00Z",
  "updatedAt": "2024-05-20T10:30:00Z"
}
