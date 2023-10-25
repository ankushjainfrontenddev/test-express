import { Sequelize } from 'sequelize';

import * as config from '@/config/sequelize';

import chabotQueryModel from './models/chatbot-query';
import cacheUser from './models/cahche-user';
// Configuration
const env = process.env.NODE_ENV;
const sequelizeConfig = config[env];

// Create sequelize instance
const sequelize = new Sequelize(sequelizeConfig);

// Import all model files
const modelDefiners = [
  chabotQueryModel,
  cacheUser,
];

// eslint-disable-next-line no-restricted-syntax
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Associations
Object.keys(sequelize.models)
  .forEach((modelName) => {
    if (sequelize.models[modelName].associate) {
      sequelize.models[modelName].associate(sequelize.models);
    }
  });

export default sequelize;
