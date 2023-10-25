"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sequelize = require("sequelize");
var _uuid = require("uuid");
// Import UUID generator

function _default(sequelize) {
  class CacheUser extends _sequelize.Model {
    static associate(models) {
      // You can define associations with other models here if needed.
    }
  }
  CacheUser.init({
    id: {
      type: _sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => (0, _uuid.v4)() // Generate a UUID for the 'id' field
    },

    ip: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false
    },
    userAgent: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: _sequelize.DataTypes.DATE,
      defaultValue: _sequelize.DataTypes.NOW,
      allowNull: false
    },
    updatedAt: {
      type: _sequelize.DataTypes.DATE,
      defaultValue: _sequelize.DataTypes.NOW,
      allowNull: false
    }
  }, {
    modelName: 'CacheUser',
    tableName: 'cache_users',
    // Set the table name to 'cache_users'
    sequelize
  });
  return CacheUser;
}