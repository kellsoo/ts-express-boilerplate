// 3rd party packages
import { Sequelize, Model, DataTypes } from 'sequelize';

// sequelize data types
const { BIGINT, STRING, DATE } = DataTypes;

// Db models
import { UserModel } from './user';
import { RoleModel } from './role';

export class UserRoleModel extends Model {
  // foreign keys
  userId: number;
  user: UserModel;
  roleId: number;
  role: RoleModel;

  // metadata
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

export default (sequelize: Sequelize, modelName: string) => {
  UserRoleModel.init(
    {
      // foreign keys
      createdBy: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    { sequelize, modelName, timestamps: true }
  );

  UserRoleModel.associate = (models) => {
    UserRoleModel.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
    UserRoleModel.belongsTo(models.User, { as: 'editor', foreignKey: 'updatedBy' });

    UserRoleModel.belongsTo(models.Role);
  };

  return UserRoleModel;
};
