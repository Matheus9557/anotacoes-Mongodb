const Tarefa = require('../models/tarefa');
const addTarefa = require('../controllers/TarefaController').addTarefa;

describe('Teste de adição de tarefa', () => {
    it('Deve adicionar uma tarefa com nome e conteúdo', async () => {
      const tarefa = { nome: 'Fazer compras', conteudo: 'Comprar leite e pão' };
      
      const result = await addTarefa(tarefa);
      
      expect(result).toEqual('Tarefa adicionada com sucesso');
    });
  });