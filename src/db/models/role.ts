// 3rd party packages
import { Sequelize, Model, DataTypes } from 'sequelize';

// Sequelize data types
const { BIGINT, STRING } = DataTypes;

import { UserModel } from './user';

export class RoleModel extends Model {
  id: number;
  role: string;
  // metadata
  creator: UserModel;
  editor: UserModel;
  destructor: UserModel;
  // meta data
  createdAt: string;
  updatedAt: string;
}

export default (sequelize: Sequelize, modelName: string) => {
  RoleModel.init(
    {
      id: {
        type: BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      role: { type: STRING, unique: true },

      // foreign keys
      createdBy: {
        type: BIGINT,
        allowNull: false,
      },
      updatedBy: {
        type: BIGINT,
        allowNull: true,
      },
      deletedBy: {
        type: BIGINT,
        allowNull: true,
      },
    },
    { sequelize, modelName, timestamps: true, paranoid: true }
  );

  RoleModel.associate = (models) => {
    RoleModel.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
    RoleModel.belongsTo(models.User, { as: 'editor', foreignKey: 'updatedBy' });
    RoleModel.belongsTo(models.User, { as: 'destructor', foreignKey: 'deletedBy' });

    RoleModel.belongsToMany(models.Permission, {
      foreignKey: 'roleId',
      through: {
        model: models.RolePermission,
        unique: true,
      },
    });

    RoleModel.belongsToMany(models.User, {
      foreignKey: 'roleId',
      through: {
        model: models.UserRole,
        unique: true,
      },
    });
  };

  return RoleModel;
};
