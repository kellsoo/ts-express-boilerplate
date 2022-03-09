// 3rd party modules
import express from 'express';

// initialization of express app
const app = express();

// API Endpoints
import v1 from './api/v1';
app.use('/', v1());

export default app;
