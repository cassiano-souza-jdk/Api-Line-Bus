//Jest = Pacote completo que facilita de fazer vários testes
//SuperTest = Serve para testar as requisições
//@typesJest
//babel

import request from "supertest";
import app from "../app.js";
import {sequelize} from "../config/database.js";

//Abre o sequelize para executar os testes
beforeAll(async () => {
    await sequelize.sync();
});
afterAll(async () => {
    await sequelize.close();
});

describe("Line test", () => {
    let token;
    let createdLineId;
//LINE ROUTES -> Create
    it("lineRoutesCreate", async () => {
        const res = await request(app)
        .post("/linhas")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Linha 5 - Xingu",
            approx_route: 10
        });
        expect(res.statusCode).toBe(201);
        createdLineId = res.body;
    });
//LINE ROUTES -> GetAll
    it("lineRoutesGetAll", async () => {
        const res = await request(app)
        .get("/linhas")
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
//LINE ROUTES -> GetById
    it("lineRoutesGetById", async () => {
        const res = await request(app)
        .get(`/linhas/${createdLineId.id}`)
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Linha 5 - Xingu');
    });
//LINE ROUTES -> Update
    it("lineRoutesUpdate", async () => {
        const res = await request(app)
        .put(`/linhas/${createdLineId.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ 
            name: "Linha 6 - Pasetto"
        });
        expect(res.statusCode).toBe(200);
    });
//LINE ROUTES -> Delete
    it("lineRoutesDelete", async () => {
        const res = await request(app)
        .delete(`/linhas/${createdLineId.id}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    });
});