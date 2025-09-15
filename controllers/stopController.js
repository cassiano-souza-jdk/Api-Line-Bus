import { StopService } from '../services/stopService.js';

    export const StopController = {
        async create(req, res){
            try{
                const stop = await StopService.createStop(req.body);
                return res.status(201).json(stop);
            }catch(err){
                return res.status(400).json({ error: err.message });
            }
        },

        async getAll(req, res) {
            try {
                const stops = await StopService.getAllStops();
                return res.status(200).json(stops);
            } catch (err) {
                return res.status(500).json({ error: err.message });
            }
        },

        async getById(req, res) {
            try {
                const stop = await StopService.getStopById(req.params.id);
                return res.status(200).json(stop);
            } catch (err) {
                return res.status(404).json({ error: err.message });
            }
        },

        async update(req, res) {
            try {
                const stop = await StopService.updateStop(req.params.id, req.body);
                return res.status(200).json(stop);
            } catch (err) {
                return res.status(404).json({ error: err.message });
            }
        },

        async delete(req, res) {
            try {
                await StopService.deleteStop(req.params.id);
                return res.status(204).send();
            } catch (err) {
                return res.status(404).json({ error: err.message });
            }
        }
}
    