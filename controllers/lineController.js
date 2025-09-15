
import { LineService } from '../services/lineService.js';

export const LineController = {
    async create(req, res){
        try{
            const line = await LineService.createLine(req.body);
            return res.status(201).json(line);
        }catch(err){
            return res.status(400).json({ error: err.message });
        }
    },

    async getAll(req, res){
        try{
            const lines = await LineService.getAllLines();
            return res.status(200).json(lines);
        }catch(err){
            return res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res){
        try{
            const line = await LineService.getLineById(req.params.id);
            return res.status(200).json(line);
        }catch(err){
            return res.status(404).json({ error: err.message });
        }
    },

    async update(req, res){
        try{
            const line = await LineService.updateLine(req.params.id, req.body);
            return res.status(200).json(line);
        }catch(err){
            return res.status(404).json({ error: err.message });
        }
    },

    async delete(req, res){
        try{
            await LineService.deleteLine(req.params.id);
            return res.status(204).send();
        }catch(err){
            return res.status(404).json({ error: err.message });
        }
    }
}