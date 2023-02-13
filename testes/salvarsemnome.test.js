const Tarefa = require('../models/tarefa');
jest.setTimeout(50000);

describe('Tarefa', () => {
  it('não deve ser capaz de criar uma tarefa sem um nome', async () => {
    Tarefa.prototype.save = jest.fn().mockRejectedValue(new Error('falha na validação da tarefa: nome: O caminho `nome` é obrigatório.'));

    const tarefa = new Tarefa({ conteudo: 'Esudar' });

    try {
      await tarefa.save();
    } catch (err) {
      expect(err.message).toMatch(/falha na validação da tarefa: nome o `nome` é obrigatório./);
    }
  });
});
