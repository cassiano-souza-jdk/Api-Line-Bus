const Circuit = require ("../models/Circuit.js");

const CircuitRepository = {
    async create(data) {
        return await Circuit.create(data);
    },

    async findAll() {
        return await Circuit.findAll();
    },

    async findById(id) {
        return await Circuit.findByPk(id);
    },

    async findByLineAndSequence(lineId, sequence) {
        return await Circuit.findOne({ where: { lineId, sequence } });
    },

    async findByLine(lineId) {
        return await Circuit.findAll({ where: { lineId } });
    },

    async findByStop(stopId) {
        return await Circuit.findAll({ where: { stopId } });
    },

    async update(id, data) {
        const circuit = await Circuit.findByPk(id);
        if (!circuit) return null;
        return await circuit.update(data);
    },

    async delete(id) {
        return await Circuit.destroy({ where: { id } });
    },

    // --- Novos métodos para suportar operações por relacionamento ---
    async updateStopInLine(lineId, stopId, data) {
        const circuit = await Circuit.findOne({ where: { lineId, stopId } });
        if (!circuit) return null;
        return await circuit.update(data);
    },

    async deleteStopInLine(lineId, stopId) {
        // retorna número de linhas deletadas (0 ou 1)
        const deleted = await Circuit.destroy({ where: { lineId, stopId } });
        return deleted;
    },

    async updateStopBySequence(lineId, sequence, data) {
        const circuit = await Circuit.findOne({ where: { lineId, sequence } });
        if (!circuit) return null;
        return await circuit.update(data);
    }
};

module.exports = CircuitRepository;
