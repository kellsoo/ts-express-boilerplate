// 3rd party modules
import config from 'config';
import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';

// types
import { IPassportConfig } from './types/interfaces';

// Passport settings
import localVerify from './passport/local-verify';
import { jwtVerifyUserApi } from './passport/jwt-verify';

const passportConfig: IPassportConfig = config.get('passport');

passport.use('local', new LocalStrategy(passportConfig.local, localVerify));
passport.use(
  'jwt-api',
  new JwtStrategy({ ...passportConfig.jwt.api, secretOrKey: passportConfig.jwt.secretOrKey }, jwtVerifyUserApi)
);

// serialization of user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Import middleware
import modelBuilder from './middleware/model-builder-middleware';

// initialization of express app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(modelBuilder);
app.use(passport.initialize());

// API Endpoints
import v1 from './api/v1';

// Main router
app.use('/', v1());

// Error handler
import ErrorHandler from './middleware/error-handler';
app.use(ErrorHandler);

export default app;
