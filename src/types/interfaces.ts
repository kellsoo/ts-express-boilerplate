// 3rd party packages
import { IStrategyOptionsWithRequest as IPassportLocalStrategyOptions } from 'passport-local';
import { JwtFromRequestFunction } from 'passport-jwt';

export interface IServerConfig {
  port: number;
  host: string;
}

export interface IConfig {
  server?: IServerConfig;
  passport: IPassportConfig;
}

export interface IJwtPayload {
  uuid: number;
  exp: number;
  audience: string;
}

export interface IPassportApiConfig {
  exp: string;
  audience: string;
  passReqToCallback: boolean;
  jwtFromRequest: JwtFromRequestFunction;
}
export interface IJwtConfig {
  secretOrKey: string;
  api: IPassportApiConfig;
}

export interface IPassportConfig {
  local: IPassportLocalStrategyOptions;
  jwt: IJwtConfig;
}

export interface IErrorWrapperItem {
  message: string;
  type: string;
  path?: string;
}
