const Tarefa = require('../models/tarefa');
const addTarefa = require('../controllers/TarefaController').addTarefa;

describe('Teste de adição de tarefa', () => {
    it('Deve adicionar uma tarefa com nome e conteúdo', async () => {
      const tarefa = { nome: 'Compras', conteudo: 'Compras de carne' };
      
      const result = await addTarefa(tarefa);
      
      expect(result).toEqual('Tarefa adicionada com sucesso');
    });
  });