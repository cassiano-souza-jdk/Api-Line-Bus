import { AdminService } from "../services/adminService.js";

export const AdminController = {
    async create(req, res) {
        try {
            const admin = await AdminService.createAdmin(req.body);
            return res.status(201).json(admin);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async getAll(req, res){
            try{
                const admins = await AdminService.getAllAdmins();
                return res.status(200).json(admins);
            }catch(err){
                return res.status(500).json({ error: err.message });
            }
        },


    async getById(req, res) {
        try {
            const admin = await AdminService.getAdminById(req.params.id);
            return res.status(200).json(admin);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await AdminService.updateAdmin(req.params.id, req.body);
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            await AdminService.deleteAdmin(req.params.id);
            return res.status(204).send();
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

    async login(req, res) {
        try {
            const { domain, password } = req.body;
            const result = await AdminService.authenticate(domain, password);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ error: err.message });
        }
    }
};
