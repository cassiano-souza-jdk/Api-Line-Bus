import { StopRepository } from "../repositories/stopRepository.js";

    export const StopService =  {
        async createStop(data) {
            if (!data.address || !data.lat || !data.long) {
                throw new Error("Endereço, latitude e longitude são obrigatórios.");
            }
            return await StopRepository.create(data);
        },

        async getAllStops() {
            return await StopRepository.findAll();
        },

        async getStopById(id) {
            const stop = await StopRepository.findById(id);
            if (!stop) {
                throw new Error("Parada não encontrada.");
            }
            return stop;
        },

        async updateStop(id, data) {
            const updated = await StopRepository.update(id, data);
            if (!updated) {
                throw new Error("Parada não encontrada para atualização.");
            }
            return updated;
        },

        async deleteStop(id) {
            const deleted = await StopRepository.delete(id);
            if (!deleted) {
                throw new Error("Parada não encontrada para exclusão.");
            }
            return deleted;
        }
    }

