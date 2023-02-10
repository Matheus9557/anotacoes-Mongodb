const Tarefa = require('../models/tarefa');

describe('Salvar duas tarefas de uma vez', () => {
  it('Deve salvar duas tarefas', async () => {
    const tarefa1 = new Tarefa({ nome: 'Fazer compras' });
    const tarefa2 = new Tarefa({ nome: 'Lavar roupa' });

    const tarefas = [tarefa1, tarefa2];

   
    Tarefa.insertMany = jest.fn().mockResolvedValue(tarefas);

    await Tarefa.insertMany(tarefas);

    expect(Tarefa.insertMany).toHaveBeenCalledWith(tarefas);

    
    Tarefa.find = jest.fn().mockResolvedValue(tarefas);

    const tarefasSalvas = await Tarefa.find({});
    expect(tarefasSalvas).toHaveLength(2);
    expect(tarefasSalvas).toEqual(tarefas);
  });
});