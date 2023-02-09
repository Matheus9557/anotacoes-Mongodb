const Tarefa = require('../models/tarefa')

describe('Teste de cadastro de tarefa com numeros e letras ', () => {
  it('Deve cadastrar uma nova tarefa com nome e conteúdo', () => {
    const novaTarefa = new Tarefa({ nome: 'Tarefa 1', conteudo: 'Conteúdo da tarefa 1' });

    novaTarefa.save((err, tarefa) => {
      if (err) {
        throw new Error('Erro ao cadastrar tarefa');
      }

      expect(tarefa.nome).toBe('Tarefa 1');
      expect(tarefa.conteudo).toBe('Conteúdo da tarefa 1');
    });
  });

  it('Deve retornar erro ao cadastrar uma tarefa sem nome', () => {
    const novaTarefa = new Tarefa({ conteudo: 'Conteúdo da tarefa 2' });

    novaTarefa.save((err) => {
      expect(err).toBeDefined();
      expect(err.errors.nome.message).toBe('O nome da tarefa é obrigatório');
    });
  });
});
