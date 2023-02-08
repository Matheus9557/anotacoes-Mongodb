const Tarefa = require('./models/tarefa');

describe('Teste de busca por título para edição', () => {
  it('Deve retornar tarefas encontradas com o título fornecido', async () => {
    const tarefaMock = { nome: 'Tarefa 1' };
    jest.spyOn(Tarefa, 'find').mockResolvedValue([tarefaMock]);

    const requestMock = { params: { nome: 'Tarefa 1' } };
    const responseMock = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    };

    const buscarTarefa = require('./controllers/TarefaController');
    await buscarTarefa.buscarTarefa(requestMock, responseMock);

    expect(Tarefa.find).toHaveBeenCalledWith({ nome: 'Tarefa 1' }, { __v: false });
    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.status().send).toHaveBeenCalledWith([tarefaMock]);
  });

  it('Deve retornar erro ao não encontrar tarefas com o título fornecido', async () => {
    jest.spyOn(Tarefa, 'find').mockResolvedValue([]);

    const requestMock = { params: { nome: 'Tarefa 2' } };
    const responseMock = {
      status: jest.fn().mockReturnValue({ send: jest.fn() }),
    };

    const buscarTarefa = require('./controllers/TarefaController');
    await buscarTarefa.buscarTarefa(requestMock, responseMock);

    expect(Tarefa.find).toHaveBeenCalledWith({ nome: 'Tarefa 2' }, { __v: false });
    expect(responseMock.status).toHaveBeenCalledWith(400);
    expect(responseMock.status().send).toHaveBeenCalledWith('Tarefa não encontrada');
  });
});