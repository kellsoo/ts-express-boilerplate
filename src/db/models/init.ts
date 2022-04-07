// 3rd party packages
import { Sequelize } from 'sequelize';

// Define models
import defineUser from './user';
import defineRole from './role';
import definePermission from './permission';
import defineRolePermission from './role-permission';
import defineUserRole from './user-role';

export const modelsBuilder = (sequelize: Sequelize) => ({
  User: defineUser(sequelize, 'user'),
  Role: defineRole(sequelize, 'role'),
  Permission: definePermission(sequelize, 'permission'),
  RolePermission: defineRolePermission(sequelize, 'rolePermission'),
  UserRole: defineUserRole(sequelize, 'userRole'),
});
