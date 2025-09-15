import { LineRepository } from '../repositories/lineRepository.js';

export const LineService = {
    async createLine(data) {
        if (!data.name || !data.approx_route) {
            throw new Error('Nome e percurso aproximado são obrigatórios.');
        }

        const exists = await LineRepository.findByName(data.name);

        if (exists) {
            throw new Error('Já existe uma linha com esse nome.');
        }

        return await LineRepository.create(data);
    },

    async getAllLines() {
        return await LineRepository.findAll();
    },

    async getLineById(id) {
        const line = await LineRepository.findById(id);

        if (!line) {
            throw new Error('Linha não encontrada.');
        }

        return line;
    },

    async updateLine(id, data) {
        const updated = await LineRepository.update(id, data);

        if (!updated) {
            throw new Error('Linha não encontrada para atualização.');
        }

        return updated;
    },

    async deleteLine(id) {
        const deleted = await LineRepository.delete(id);

        if (!deleted) {
            throw new Error('Linha não encontrada para exclusão.');
        }

        return deleted;
    }
};

