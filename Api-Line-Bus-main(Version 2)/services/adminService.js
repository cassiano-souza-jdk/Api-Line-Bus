import { adminRepository } from "../repositories/adminRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

    export const AdminService = {
        async createAdmin(data) {
        if (!data.domain || !data.password) {
            throw new Error("Domínio e senha são obrigatórios");
            }
            return await adminRepository.create(data);
        },

        async getAllAdmins() {
            return await adminRepository.findAll();
        },

        async getAdminById(id) {
            const admin = await adminRepository.findById(id);
            if (!admin) throw new Error("Admin não encontrado.");
            return admin;
        },

        async getAdminByDominio(domain) {
            const admin = await adminRepository.findByDomain(domain);
            if (!admin) throw new Error("Domínio não encontrado");
            return admin;
        },

        async updateAdmin(id, data) {
            const updated = await adminRepository.update(id, data);
            if (!updated) throw new Error("Admin não encontrado para atualização.");
            return updated;
        },

        async deleteAdmin(id) {
            const deleted = await adminRepository.delete(id);
            if (!deleted) throw new Error("Admin não encontrado para exclusão.");
            return deleted;
        },

        async authenticate(domain, password) {
            const admin = await adminRepository.findByDomain(domain);
            if (!admin) throw new Error("Credenciais inválidas.");

            const match = await bcrypt.compare(password, admin.password);
            if (!match) throw new Error("Credenciais inválidas.");

            const token = jwt.sign(
                { id: admin.id, domain: admin.domain },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return { admin, token };
        }
    }


