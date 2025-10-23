const Line = require('./Line');
const Stop = require ("./Stop");
const Circuit = require ("./Circuit");

Line.belongsToMany(Stop, { through: Circuit});
Stop.belongsToMany(Stop, { through: Circuit});