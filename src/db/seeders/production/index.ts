import { up as prodUp1 } from './202203101023-users';

export const up = () => Promise.resolve();
export const down = () => {
  console.log(__dirname);

  Promise.resolve();
};

export default [prodUp1];
