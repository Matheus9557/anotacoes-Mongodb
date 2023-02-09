const Tarefa = require('../models/tarefa');
process.env.JEST_TIMEOUT = 50000;
describe('deletarTarefa', () => {
    beforeEach(async () => {
      await Tarefa.deleteMany({});
      await Tarefa.create({ nome: 'Fazer compras' });
    });
  
    it('Deve remover uma tarefa existente', async () => {
      const tarefas = await Tarefa.find({});
      expect(tarefas).toHaveLength(1);
  
      await Tarefa.deleteOne({ nome: 'Fazer compras' });
      const tarefasAtualizadas = await Tarefa.find({});
      expect(tarefasAtualizadas).toHaveLength(0);
    });
  
    it('Deve retornar erro ao remover tarefa não existente', async () => {
      try {
        await Tarefa.deleteOne({ nome: 'Tarefa não existente' });
      } catch (error) {
        expect(error).toEqual(new Error('Tarefa não encontrada'));
      }
    });
  });




