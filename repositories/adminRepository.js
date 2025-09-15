import { Admin } from "../models/Admin.js";

  export const adminRepository = {
    async create(data) {
      return await Admin.create(data);
    },

    async findAll() {
      return await Admin.findAll();
    },

    async findById(id) {
      return await Admin.findByPk(id);
    },

    async findByDomain(domain) {
      return await Admin.findOne({where:{domain}});
    },

    async update(id, data) {
      const admin = await Admin.findByPk(id);
        if (!admin) return null;
        return await admin.update(data);
    },
    
    async delete(id) {
      const admin = await Admin.findByPk(id);
        if (!admin) return false;
        await admin.destroy();
        return true;
    }
  }

