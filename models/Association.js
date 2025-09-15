import { Line } from '../models/Line.js';
import { Stop } from '../models/Stop.js';
import { Circuit } from '../models/Circuit.js';

Line.belongsToMany(Stop, { through: Circuit, foreignKey: 'lineId'});
Stop.belongsToMany(Line, { through: Circuit, foreignKey: 'stopId'});