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

describe("Stop test", () => {
    let token;
    let createdStopId;

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

//STOP ROUTES -> Delete
    it("stopRoutesDelete", async () => {
        const res = await request(app)
        .delete(`/paradas/${createdStopId.id}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    });
});