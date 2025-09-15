import { Line } from '../models/Line.js';

export const LineRepository = {
    async create(data) {
        return await Line.create(data);
    },

    async findAll() {
        return await Line.findAll();
    },

    async findById(id) {
        return await Line.findByPk(id);
    },

    async findByName(name) {
        return await Line.findOne({ where: { name } });
    },

    async update(id, data) {
        const line = await Line.findByPk(id);
        if(!line) return null;
        return await line.update(data);
    },

    async delete(id) {
        const line = await Line.findByPk(id);
        if (!line) return null;
        await line.destroy();
        return line;
    }
};
