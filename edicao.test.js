const Tarefa = require('./models/tarefa');

describe('Teste de edição de descrição', () => {
  let tarefa;

  beforeEach(() => { tarefa = new Tarefa({ nome: 'Estudar ', descricao: 'Estudar bd ' });
  });

  it('Deve editar a descrição corretamente',() => {
    tarefa.descricao = 'Estudar testes';
    expect(tarefa.descricao).toEqual('Estudar testes');
  });
});