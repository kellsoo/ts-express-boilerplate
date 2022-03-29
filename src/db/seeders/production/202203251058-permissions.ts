// 3rd party modules
import { forEach, keys } from 'lodash';
import { QueryInterface } from 'sequelize';

// Db
import { models } from '../../models/';

// utils
import { errorMessage } from '../../../utils/console-messages';
import { PERMISSIONS, PERMISSION_GROUPS } from '../../../utils/enums';

const permissionsData: any[] = [];
forEach(PERMISSION_GROUPS, (permissionGroup) => {
  forEach(PERMISSIONS, (permission) => {
    if (permission.includes(permissionGroup)) {
      permissionsData.push({
        permissionGroup,
        permission,
      });
    }
  });
});

export async function up() {
  try {
    const { Permission } = models;
    await Permission.bulkCreate(permissionsData);
  } catch (err) {
    const msg = errorMessage(err);
    console.log(msg);
  }
}

export async function down(queryInterface: QueryInterface) {
  try {
    await queryInterface.dropTable('roles', { cascade: true });
  } catch (err) {
    console.log(errorMessage(err));
    Promise.reject();
  }
}
