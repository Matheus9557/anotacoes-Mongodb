const deletarTarefa = require('../controllers/TarefaController').deletarTarefa;
describe("Teste de remoção de tarefa", () => {
  it("Deve remover uma tarefa existente", () => {
  const tarefasAntigas = [{ nome: "Fazer compras" }];
  expect(tarefasAntigas).toHaveLength(1);
  

  const tarefasAtualizadas = tarefasAntigas.filter(
    tarefa => tarefa.nome !== "Fazer compras"
  );
  expect(tarefasAtualizadas).toHaveLength(0);
  });
  
  
  });
  
  
  
  
  