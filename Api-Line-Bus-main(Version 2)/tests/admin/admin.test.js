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

describe("Admin test", () => {
    let token;
    let createdAdminId;
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
//ADMIN ROUTES -> Delete
    it("adminRoutesDelete", async () => {
        const res = await request(app)
        .delete(`/admins/${createdAdminId.id}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    });
});