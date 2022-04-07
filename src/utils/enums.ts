export enum MESSAGE_TYPE {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export enum ENV {
  development = 'development',
  test = 'test',
  production = 'production',
}

export enum JWT_AUDIENCE {
  API = 'jwt-api',
  FORGOTTEN_PASSWORD = 'jwt-forgotten-password',
  INVITATION = 'invitation',
}

export enum ROLE {
  ADMIN = 'Administrator',
  USER = 'User',
}

export const ROLES = Object.values(ROLE);

export enum PERMISSION {
  EXAMPLE_READ = 'EXAMPLE_READ',
  EXAMPLE_WRITE = 'EXAMPLE_WRITE',
}

export const PERMISSIONS = Object.values(PERMISSION);

export enum PERMISSION_GROUP {
  EXAMPLE = 'EXAMPLE',
}

export const PERMISSION_GROUPS = Object.values(PERMISSION_GROUP);
