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
