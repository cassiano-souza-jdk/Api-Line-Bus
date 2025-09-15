import { CircuitService } from "../services/circuitService.js";

export const CircuitController = {
    async create(req, res) {
        try {
            const circuit = await CircuitService.createCircuit(req.body);
            return res.status(201).json(circuit);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async getAll(req, res) {
        try {
            const circuits = await CircuitService.getAllCircuits();
            return res.status(200).json(circuits);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const circuit = await CircuitService.getCircuitById(req.params.id);
            return res.status(200).json(circuit);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            const updated = await CircuitService.updateCircuit(req.params.id, req.body);
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            await CircuitService.deleteCircuit(req.params.id);
            return res.status(204).send();
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

    async getByLine(req, res) {
        try {
            const circuits = await CircuitService.getCircuitsByLine(req.params.idLinha);
            return res.status(200).json(circuits);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

    async getCircuitsByStop(req, res) {
        try {
            const {stopId} = req.params.stopId;
            const circuits = await CircuitService.getCircuitsByStop(stopId);
            return res.status(200).json(circuits);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

    async updateStopInLine(req, res) {
        try {
            const lineId = req.params.lineId;
            const stopId = req.params.stopId;
            const data = { sequence: req.body.sequence, approx_time: req.body.approx_time };
            const updated = await CircuitService.updateStopInLine(lineId, stopId, data);
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

    async deleteStopInLine(req, res) {
        try {
            const lineId = req.params.lineId;
            const stopId = req.params.stopId;
            await CircuitService.deleteStopInLine(lineId, stopId);
            return res.status(204).send();
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

    async getStopByLineAndSequence(req, res) {
        try {
            const lineId = req.params.lineId;
            const sequence = req.params.sequence;
            const circuit = await CircuitService.getStopByLineAndSequence(lineId, sequence);
            return res.status(200).json(circuit);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },

   async updateStopBySequence(req, res) {
        try {
            const lineId = req.params.lineId;
            const sequence = req.params.sequence;

            const data = {};
            if (req.body.stopId) data.stopId = req.body.stopId;
            if (req.body.approx_time) data.approx_time = req.body.approx_time;

            const updated = await CircuitService.updateStopBySequence(lineId, sequence, data);
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    }   
};
