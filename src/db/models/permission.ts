// 3rd party packages
import { Sequelize, Model, DataTypes } from 'sequelize';

// sequelize data types
const { BIGINT, ENUM } = DataTypes;

// utils
import { PERMISSION, PERMISSIONS, PERMISSION_GROUP, PERMISSION_GROUPS } from '../../utils/enums';

// models
import { RoleModel } from './role';

export class PermissionModel extends Model {
  id: number;
  permission: PERMISSION;
  permissionGroup: PERMISSION_GROUP;
}

export default (sequelize: Sequelize, modelName: string) => {
  PermissionModel.init(
    {
      id: { type: BIGINT, primaryKey: true, unique: true, autoIncrement: true },
      permission: { type: ENUM(...PERMISSIONS) },
      permissionGroup: { type: ENUM(...PERMISSION_GROUPS) },
    },
    {
      sequelize,
      modelName,
      timestamps: false,
    }
  );

  PermissionModel.associate = (models) => {
    PermissionModel.belongsToMany(models.Role, {
      foreignKey: 'permissionId',
      through: {
        model: models.RolePermission,
        unique: true,
      },
    });
  };

  return PermissionModel;
};
