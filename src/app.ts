// 3rd party modules
import express from 'express';

// initialization of express app
const app = express();

// API Endpoints
import v1 from './api/v1';

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', v1());

// Error handler
import ErrorHandler from './middleware/error-handler';
app.use(ErrorHandler);

export default app;
