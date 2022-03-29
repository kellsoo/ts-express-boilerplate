// 3rd party packages
import { Sequelize, Model, DataTypes } from 'sequelize';

// Models
import { RoleModel } from './role';
import { PermissionModel } from './permission';
import { UserModel } from './user';

const { BIGINT } = DataTypes;

export class RolePermissionModel extends Model {
  // foreign keys
  roleId: number;
  role: RoleModel;
  permissionId: number;
  Permission: PermissionModel;

  // metadata
  createdAt: string;
  createdBy: UserModel;
  updatedAt: string;
  updatedBy: UserModel;
}

export default (sequelize: Sequelize, modelName: string) => {
  RolePermissionModel.init(
    {},
    {
      sequelize,
      modelName,
      timestamps: true,
    }
  );

  RolePermissionModel.associate = (models) => {
    RolePermissionModel.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
    RolePermissionModel.belongsTo(models.User, { as: 'editor', foreignKey: 'updatedBy' });
  };
  return RolePermissionModel;
};
