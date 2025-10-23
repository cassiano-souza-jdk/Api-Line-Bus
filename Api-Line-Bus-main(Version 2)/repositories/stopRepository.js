const Stop = require ("../models/Stop.js");

  class StopRepository {

    async create(data) {
      return await Stop.create(data);
    }

    async findAll() {
      return await Stop.findAll();
    }

    async findById(id) {
      return await Stop.findByPk(id);
    }

    async update(id, data) {
      const stop = await Stop.findByPk(id);

      if(!stop){
        return null;
      }

      return await stop.update(data);
    }

    async delete(id) {
      const stop = await Stop.findByPk(id);
    
        if (!stop) return null;
        await stop.destroy();
        return true;
    }
  }

module.exports = new StopRepository();