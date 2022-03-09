export interface IServerConfig {
  port: number;
  host: string;
}

export interface IConfig {
  server?: IServerConfig;
}
