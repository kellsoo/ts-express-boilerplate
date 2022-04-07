// 3rd party packages
import { map, forEach, filter } from 'lodash';
import { Op } from 'sequelize';

// db
import { models } from '../../models';

// utils
import { errorMessage } from '../../../utils/console-messages';
import { PERMISSIONS, ROLE } from '../../../utils/enums';

// functions
const createRolePermissionData = async () => {
  const rolePermissionData: any[] = [];
  const { Permission, Role } = models;

  // Admin Role
  const adminRoleId = (await Role.findOne({ where: { role: ROLE.ADMIN } })).id;
  forEach(await Permission.findAll(), ({ id }) => {
    rolePermissionData.push({ roleId: adminRoleId, permissionId: id, createdBy: 1 });
  });

  // User role
  const userRoleId = (await Role.findOne({ where: { role: ROLE.USER } })).id;
  const readPermissionsNames = filter(PERMISSIONS, (permission) => permission.includes('READ'));
  forEach(
    await Permission.findAll({
      where: {
        permission: { [Op.in]: readPermissionsNames },
      },
    }),
    ({ id }) => {
      rolePermissionData.push({ roleId: userRoleId, permissionId: id, createdBy: 1 });
    }
  );

  return rolePermissionData;
};

export async function up() {
  try {
    const { RolePermission } = models;
    const rolePermissionData = await createRolePermissionData();
    await RolePermission.bulkCreate(rolePermissionData);
    Promise.resolve();
  } catch (err) {
    console.log(errorMessage(err));
    Promise.reject(err);
  }
}
export async function down() {}
