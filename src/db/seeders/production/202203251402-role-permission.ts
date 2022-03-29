// 3rd party packages
import { QueryInterface } from 'sequelize';

// utils
import { errorMessage } from '../../../utils/console-messages';

export async function up() {}
export async function down(queryInterface: QueryInterface) {
  try {
    await queryInterface.dropTable('roles', { cascade: true });
  } catch (err) {
    console.log(errorMessage(err));
    Promise.reject();
  }
}
