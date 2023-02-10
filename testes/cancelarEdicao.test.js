const Tarefa = require('../models/tarefa');
jest.setTimeout(60000);

describe('Salvar duas tarefas de uma vez', () => {
  it('Deve salvar duas tarefas', async () => {
    const tarefa1 = new Tarefa({ nome: 'Fazer compras' });
    const tarefa2 = new Tarefa({ nome: 'Lavar roupa' });

    const tarefas = [tarefa1, tarefa2];

    await Tarefa.insertMany(tarefas);

    const tarefasSalvas = await Tarefa.find({});
    expect(tarefasSalvas).toHaveLength(2);
  });
});