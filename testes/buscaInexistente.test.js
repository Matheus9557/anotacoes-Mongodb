const TarefaController = require("../controllers/TarefaController");

describe("Teste de busca por nome", () => {
  it("Deve retornar uma tarefa quando houver dados encontrados", async () => {
    const nome = "Treinar pela manhã";

    const tarefa = await TarefaController.buscarTarefa(nome);

    expect(tarefa).toBeTruthy();
    expect(tarefa.nome).toEqual(nome);
  });
});
