// 3rd party
import { Model, DataTypes, Sequelize } from 'sequelize';

// Sequelize types
const { BIGINT, STRING, DATE } = DataTypes;

export class UserModel extends Model {
  id: number;
  email: string;
  password: string;
  lastLoginAt: string;
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
      lastLoginAt: { type: DATE },
    },
    { sequelize, modelName, timestamps: true }
  );

  return UserModel;
};
