"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sequelize = require("sequelize");
function _default(sequelize) {
  class ChatbotQuery extends _sequelize.Model {
    static associate(models) {
      // Assuming you have a 'User' model defined
      //ChatbotQuery.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  ChatbotQuery.init({
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: _sequelize.DataTypes.UUID,
      allowNull: true // Allow null if not associated with a user
    },

    query: {
      type: _sequelize.DataTypes.TEXT,
      // Assuming you want 'query' as text
      allowNull: false
    },
    response: {
      type: _sequelize.DataTypes.JSON,
      // Assuming you want 'response' as a JSON object
      allowNull: true // Allow null if response is not available yet
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
    modelName: 'ChatbotQuery',
    tableName: 'chatbot_query',
    // Set the table name to 'chatbot_query'
    sequelize
  });
  return ChatbotQuery;
}