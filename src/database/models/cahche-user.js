import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

export default function (sequelize) {
    class CacheUser extends Model {
        static associate(models) {
            // You can define associations with other models here if needed.
        }
    }

    CacheUser.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: () => uuidv4(), // Generate a UUID for the 'id' field
            },
            ip: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userAgent: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            company: {
                type: DataTypes.STRING,
                allowNull: false,
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
            modelName: 'CacheUser',
            tableName: 'cache_users', // Set the table name to 'cache_users'
            sequelize,
        }
    );

    return CacheUser;
}
