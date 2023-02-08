const Tarefa = require('./models/tarefa');

describe('Teste de edição de descrição', () => {
  let tarefa;

  beforeEach(() => { tarefa = new Tarefa({ nome: 'Comprar leite', descricao: 'Comprar leite na loja' });
  });

  it('Deve editar a descrição corretamente', () => {
    tarefa.descricao = 'Comprar leite no supermercado';
    expect(tarefa.descricao).toEqual('Comprar leite no supermercado');
  });
});