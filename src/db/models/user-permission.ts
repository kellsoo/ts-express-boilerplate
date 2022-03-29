// 3rd party packages
import { Sequelize, DataTypes, Model } from 'sequelize';

// sequelize data types
const { BIGINT, STRING, ENUM } = DataTypes;

// db models
import { UserModel } from './user';

export class PermissionModel extends Model {
  id: number;
  key: string;
  groupKey: string;

  // metadata
  createdBy: UserModel;
  createdAt: string;
  updatedBy: UserModel;
  updatedAt: string;
}

export default (sequelize: Sequelize, modelName: string) => {
  PermissionModel.init(
    {
      id: { type: BIGINT, primaryKey: true, unique: true, allowNull: false, autoIncrement: true },
      name: {
        type: STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName,
      timestamps: true,
    }
  );
  return PermissionModel;
};
