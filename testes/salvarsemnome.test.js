const Tarefa = require('../models/tarefa');
jest.setTimeout(50000);

describe('Tarefa', () => {
  it('should not be able to create a task without a name', async () => {
    // Cria o mock da função de salvar no banco de dados
    Tarefa.prototype.save = jest.fn().mockRejectedValue(new Error('tarefa validation failed: nome: Path `nome` is required.'));

    const tarefa = new Tarefa({ conteudo: 'Example content' });

    try {
      await tarefa.save();
    } catch (err) {
      expect(err.message).toMatch(/tarefa validation failed: nome: Path `nome` is required./);
    }
  });
});
