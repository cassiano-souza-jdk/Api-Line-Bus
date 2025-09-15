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

describe("Test routes", () => {
    let token;
    let createdAdminId;
    let createdLineId;
    let createdStopId;
    let createdCircuitId;
//ADMIN ROUTES -> Create
    it("adminRoutesCreate", async () => {
        const res = await request(app)
        .post("/admins")
        .send({
            domain: "Krakozhia",
            password: "123CBA"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        createdAdminId = res.body;
    });
//ADMIN ROUTES -> Login
    it("adminRoutesLogin", async () => {
        const res = await request(app)
        .post("/loginAdmin")
        .send({
            domain: "Krakozhia",
            password: "123CBA"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        token = res.body.token;
    });
//ADMIN ROUTES -> GetAll
    it("adminRoutesGetAll", async () => {
        const res = await request(app)
        .get("/admins")
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
//ADMIN ROUTES -> GetById
    it("adminRoutesGetById", async () => {
        const res = await request(app)
        .get(`/admins/${createdAdminId.id}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.domain).toBe('Krakozhia');
    });
//ADMIN ROUTES -> Update
    it("adminRoutesUpdate", async () => {
        const res = await request(app)
        .put(`/admins/${createdAdminId.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            domain: "Lins" 
        });
        expect(res.statusCode).toBe(200);
    });

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

//STOP ROUTES -> Create
    it("stopRoutesCreate", async () => {
        const res = await request(app)
        .post("/paradas")
        .set("Authorization", `Bearer ${token}`)
        .send({
            address: "Estrada Mário Covas Junior , km 1 - Vila Guararapes, Lins - SP, 16403-025",
            lat: -2169834,
            long: -4975020
        });
        expect(res.statusCode).toBe(201);
        createdStopId = res.body;
    });
//STOP ROUTES -> GetAll
    it("stopRoutesGetAll", async () => {
        const res = await request(app)
        .get("/paradas");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
//STOP ROUTES -> GetById
    it("stopRoutesGetById", async () => {
        const res = await request(app)
        .get(`/paradas/${createdStopId.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.address).toBe('Estrada Mário Covas Junior , km 1 - Vila Guararapes, Lins - SP, 16403-025');
    });
//STOP ROUTES -> Update
    it("stopRoutesUpdate", async () => {
        const res = await request(app)
        .put(`/paradas/${createdStopId.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ 
            lat: -2169833
        });
        expect(res.statusCode).toBe(200);
    });

//CIRCUIT ROUTES -> Create
    it("circuitRoutesCreate", async () => {
        const res = await request(app)
        .post("/rotas")
        .set("Authorization", `Bearer ${token}`)
        .send({
            lineId: createdLineId.id,
            stopId: createdStopId.id,
            sequence: 2,
            approx_time: "5min"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        createdCircuitId = res.body;
    });
//CIRCUIT ROUTES -> GetAll
    it("circuitRoutesGetAll", async () => {
        const res = await request(app)
        .get("/rotas");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
//CIRCUIT ROUTES -> GetById
    it("circuitRoutesGetById", async () => {
        const res = await request(app)
        .get(`/rotas/${createdCircuitId.id}`)
        expect(res.statusCode).toBe(200);
        expect(res.body.sequence).toBe(2);
    });
//CIRCUIT ROUTES -> Update
    it("circuitRoutesUpdate", async () => {
        const res = await request(app)
        .put(`/rotas/${createdCircuitId.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ 
            approx_time: "10min"
        });
        expect(res.statusCode).toBe(200);
    });
//CIRCUIT ROUTES -> AddStopToLine
    it("circuitRoutesAddStopToLine", async () => {
        const res = await request(app)
        .post(`/rotas/Adicionar/`)
        .set("Authorization", `Bearer ${token}`)
        .send({ 
            lineId: createdLineId.id,
            stopId: createdStopId.id,
            sequence: 3,
            approx_time: "25min"
        });
        expect(res.statusCode).toBe(201);
    });
// CIRCUIT ROUTES -> GetStopsByLine
    it("circuitRoutesGetCircuitsByLine", async () => {
        const res = await request(app).get(`/rotas/linhas/${createdLineId.id}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

// CIRCUIT ROUTES -> GetCircuitsByStop
    it("circuitRoutesGetCircuitsByStop", async () => {
    const res = await request(app).get(`/rotas/paradas/${createdStopId.id}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    });
// CIRCUIT ROUTES -> GetStopByLineAndSequence
    it("circuitRoutesGetStopByLineAndSequence", async () => {
        const res = await request(app).get(`/rotas/linhas/${createdLineId.id}/rotas/2`);
        expect(res.statusCode).toBe(200);
        expect(res.body.sequence).toBe(2);
    });
// CIRCUIT ROUTES -> UpdateStopBySequence
    it("circuitRoutesUpdateStopBySequence", async () => {
        const res = await request(app)
        .put(`/rotas/linhas/${createdLineId.id}/rotas/1`)
        .set("Authorization", `Bearer ${token}`)
        .send({ approx_time: "7min" });
    expect(res.statusCode).toBe(200);
    });

// CIRCUIT ROUTES -> DeleteStopInLine
    it("circuitRoutesDeleteStopInLine", async () => {
    const res = await request(app)
        .delete(`/rotas/linhas/${createdLineId.id}/rotas/${createdStopId.id}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    });

//CIRCUIT ROUTES -> Delete
    it("circuitRoutesDelete", async () => {
        const res = await request(app)
        .delete(`/rotas/${createdCircuitId.id}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    });

//STOP ROUTES -> Delete
    it("stopRoutesDelete", async () => {
        const res = await request(app)
        .delete(`/paradas/${createdStopId.id}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    });

//LINE ROUTES -> Delete
    it("lineRoutesDelete", async () => {
        const res = await request(app)
        .delete(`/linhas/${createdLineId.id}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    });

//ADMIN ROUTES -> Delete
    it("adminRoutesDelete", async () => {
        const res = await request(app)
        .delete(`/admins/${createdAdminId.id}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    });
});