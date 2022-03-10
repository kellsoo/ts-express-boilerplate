// 3rd party
import { Model, DataTypes, Sequelize } from 'sequelize';

// Sequelize types
const { BIGINT, STRING } = DataTypes;

export class UserModel extends Model {
  id: number;
  email: string;
  hash: string;
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
        type: STRING(),
        allowNull: false,
      },
    },
    { sequelize, modelName, timestamps: true }
  );

  return UserModel;
};
