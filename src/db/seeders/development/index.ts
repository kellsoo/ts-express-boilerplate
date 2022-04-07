// ups
import { up as devUp1 } from './202203101127-users';
import { up as devUp2 } from './202203281421-user-role';

export const up = () => Promise.resolve();
export const down = () => Promise.resolve();

export default [devUp1, devUp2];
