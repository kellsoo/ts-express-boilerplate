export interface IServerConfig {
  port: number;
  host: string;
}

export interface IConfig {
  server?: IServerConfig;
}

export interface IErrorWrapperItem {
  message: string;
  type: string;
  path?: string;
}
