import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
    class ChatbotQuery extends Model {
        static associate(models) {
            // Assuming you have a 'User' model defined
            //ChatbotQuery.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }

    ChatbotQuery.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: true, // Allow null if not associated with a user
            },
            query: {
                type: DataTypes.TEXT, // Assuming you want 'query' as text
                allowNull: false,
            },
            response: {
                type: DataTypes.JSON, // Assuming you want 'response' as a JSON object
                allowNull: true, // Allow null if response is not available yet
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
        },
        {
            modelName: 'ChatbotQuery',
            tableName: 'chatbot_query', // Set the table name to 'chatbot_query'
            sequelize,
        }
    );

    return ChatbotQuery;
}
