"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var config = _interopRequireWildcard(require("../config/sequelize"));
var _chatbotQuery = _interopRequireDefault(require("./models/chatbot-query"));
var _cahcheUser = _interopRequireDefault(require("./models/cahche-user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Configuration
const env = process.env.NODE_ENV;
const sequelizeConfig = config[env];

// Create sequelize instance
const sequelize = new _sequelize.Sequelize(sequelizeConfig);

// Import all model files
const modelDefiners = [_chatbotQuery.default, _cahcheUser.default];

// eslint-disable-next-line no-restricted-syntax
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Associations
Object.keys(sequelize.models).forEach(modelName => {
  if (sequelize.models[modelName].associate) {
    sequelize.models[modelName].associate(sequelize.models);
  }
});
var _default = exports.default = sequelize;