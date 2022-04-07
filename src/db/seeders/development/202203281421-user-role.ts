// 3rd party packages
import {} from 'lodash';

// utils
import { errorMessage } from '../../../utils/console-messages';
import { ROLE } from '../../../utils/enums';

// db models
import { models } from '../../models';

// user role data

const createUserRoleData = async () => {
  const userRoleData = [];
  const { User, Role } = models;
  const testUserId = (await User.findOne({ where: { email: 'test@user.sk' } })).id;
  const userRoleId = (await Role.findOne({ where: { role: ROLE.USER } })).id;

  userRoleData.push({ userId: testUserId, roleId: userRoleId, createdBy: 1 });

  const testAdminId = (await User.findOne({ where: { email: 'test@admin.sk' } })).id;
  const adminRoleId = (await Role.findOne({ where: { role: ROLE.ADMIN } })).id;
  userRoleData.push({ userId: testAdminId, roleId: adminRoleId, createdBy: 1 });
  return userRoleData;
};

export async function up() {
  try {
    const { UserRole } = models;
    const userRoleData = await createUserRoleData();
    await UserRole.bulkCreate(userRoleData);
    return Promise.resolve();
  } catch (err) {
    console.log(errorMessage(err));
    return Promise.reject(err);
  }
}

export async function down() {
  return Promise.all();
}
