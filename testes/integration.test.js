const request = require('supertest');
const app = require('../index');

describe('Adicionar tarefa', () => {
   
    it('Deve adicionar uma tarefa', async () => {
        const response = await request(app)
            .post('/api/addtarefas')
            .send({ nome: "Teste", conteudo: "de Integração" });

        expect(response.statusCode).toBe(200);
        expect(response.body.nome).toEqual("Teste");
        expect(response.body.conteudo).toEqual("de Integração");
    });


});

describe('Editar tarefa', () => {

    it('Deve editar uma tarefa', async () => {
        const response = await request(app)
            .put('/api/editar')
            .send({ nome: "Teste", conteudo: "de Integração Atualizado" });

        expect(response.statusCode).toBe(200);
        expect(response.body.nome).toEqual("Teste");
        expect(response.body.conteudo).toEqual("de Integração Atualizado");
    });
});

describe('Visualizar tarefas', () => {
    
    it('Deve retornar uma lista de tarefas', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            {
                nome: expect.any(String),
                conteudo: expect.any(String)
            }
        ]));
    });
});