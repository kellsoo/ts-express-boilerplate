// 3rd party packages
import { QueryInterface } from 'sequelize';

// utils
import { ROLES } from '../../../utils/enums';
import { errorMessage } from '../../../utils/console-messages';

// db models
import { models } from '../../models';

export async function up() {
  try {
    const { Role } = models;
    const roles = [];

    for (const role of ROLES) {
      roles.push({ role: role, createdBy: 1 });
    }
    await Role.bulkCreate(roles);
  } catch (err) {
    console.log(errorMessage(err));
  }
}

export async function down(queryInterface: QueryInterface) {
  try {
    await queryInterface.dropTable('roles', { cascade: true });
  } catch (err) {
    console.log(errorMessage(err));
  }
}
