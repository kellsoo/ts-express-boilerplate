// 3rd party
import { Model, DataTypes, Sequelize } from 'sequelize';

// Sequelize types
const { BIGINT, STRING, DATE } = DataTypes;

export class UserModel extends Model {
  id: number;
  email: string;
  password: string;
  lastLoginAt: string;
  confirmedAt: string;

  // foreign keys
  createdBy: number;
  creator: UserModel;
  updatedBy: number;
  editor: UserModel;
  deletedBy: number;
  destructor: UserModel;

  // metadata
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export default (sequelize: Sequelize, modelName: string) => {
  UserModel.init(
    {
      id: { type: BIGINT, primaryKey: true, allowNull: false, unique: true, autoIncrement: true },
      email: {
        type: STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: STRING,
      },
      lastLoginAt: DATE,
      confirmedAt: DATE,

      // foreign keys
      createdBy: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      deletedBy: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    { sequelize, modelName, timestamps: true, paranoid: true }
  );

  UserModel.associate = (models) => {
    UserModel.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
    UserModel.belongsTo(models.User, { as: 'editor', foreignKey: 'updatedBy' });
    UserModel.belongsTo(models.User, { as: 'destructor', foreignKey: 'deletedBy' });

    UserModel.belongsToMany(models.Role, {
      foreignKey: 'userId',
      through: {
        model: models.UserRole,
        unique: true,
      },
    });
  };
  return UserModel;
};
