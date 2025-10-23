import { circuitRepository } from "../repositories/circuitRepository.js";

export const CircuitService = {
    async createCircuit(data) {
        if (!data.lineId || !data.stopId || !data.sequence || !data.approx_time) {
            throw new Error("lineId, stopId, sequence e approx_time são obrigatórios.");
        }
        return await circuitRepository.create(data);
    },

    async getAllCircuits() {
        return await circuitRepository.findAll();
    },

    async getCircuitById(id) {
        const circuit = await circuitRepository.findById(id);
        if (!circuit) throw new Error("Circuito não encontrado.");
        return circuit;
    },

    async updateCircuit(id, data) {
        const updated = await circuitRepository.update(id, data);
        if (!updated) throw new Error("Circuito não encontrado para atualização.");
        return updated;
    },

    async deleteCircuit(id) {
        const deleted = await circuitRepository.delete(id);
        if (!deleted) throw new Error("Circuito não encontrado para exclusão.");
        return deleted;
    },

    async getCircuitsByLine(lineId) {
        return await circuitRepository.findByLine(lineId);
    },

    async getCircuitsByStop(stopId) {
        return await circuitRepository.findByStop(stopId);
    },

    async updateStopInLine(lineId, stopId, data) {
        const updated = await circuitRepository.updateStopInLine(lineId, stopId, data);
        if (!updated) throw new Error("Parada não encontrada para atualização nessa linha.");
        return updated;
    },

    async deleteStopInLine(lineId, stopId) {
        const deleted = await circuitRepository.deleteStopInLine(lineId, stopId);
        if (!deleted) throw new Error("Parada não encontrada para exclusão nessa linha.");
        return deleted;
    },

    async getStopByLineAndSequence(lineId, sequence) {
        const circuit = await circuitRepository.findByLineAndSequence(lineId, sequence);
        if (!circuit) throw new Error("Circuito não encontrado para esta linha e sequência.");
        return circuit;
    },

    async updateStopBySequence(lineId, sequence, data) {
    const updated = await circuitRepository.updateStopBySequence(lineId, sequence, data);
    if (!updated) throw new Error("Circuito não encontrado para atualização da sequência.");
    return updated;
    }

};
